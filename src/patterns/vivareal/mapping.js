import builder from "xmlbuilder";
import _ from "lodash";
import moment from "moment";
import {
  getIf,
  getType,
  getMapper,
  getFeatures,
  getPropertyStatus,
} from "./helpers";

export default function (property, context) {
  //
  const { map } = getMapper(property);

  const PriceTag =
    property.operation_id == "sale" ? "ListPrice" : "RentalPrice";

  const PricePeriod = property.operation_id == "rent" ? "Montly" : "Daily";

  // ---------------------------------------------------------------------------
  // LOCATION
  const Location = map([
    {
      key: "Country",
      default: { "@abbreviation": "BR", "#text": "Brasil" },
    },
    {
      key: "State",
      from: "location.state",
      handle: ({ acronym, name }) => ({
        "@abbreviation": _.toUpper(acronym),
        "#text": _.trim(name),
      }),
    },
    {
      key: "City",
      from: "location.city.name",
      handle: (value) => _.trim(value),
    },
    {
      key: "Neighborhood",
      from: "location.district.name",
      handle: (value) => _.trim(value),
    },
    { key: "Zone", from: "location.zone" },
    {
      key: "Address",
      from: "location.street",
      handle: (value) => ({
        "@publiclyVisible": true,
        "#text": _.trim(value),
      }),
    },
    { key: "PostalCode", from: "location.postalcode" },
    { key: "Latitude", from: "location.position.lat" },
    { key: "Longitude", from: "location.position.lon" },
  ]);

  // ---------------------------------------------------------------------------

  // DETAILS
  const Details = map([
    {
      key: "Description",
      from: "description",
      handle: (value) => ({ "#cdata": value }),
    },
    {
      key: PriceTag,
      from: "price",
      handle: (value) => ({
        "@currency": "BRL",
        "#text": value,
        ...getIf(PriceTag == "RentalPrice", () => ({
          "@period": PricePeriod,
        })),
      }),
    },
    { key: "Bedrooms", from: "attrs.bed.value" },

    { key: "Bathrooms", from: "attrs.bath.value" },

    { key: "Garage", from: "attrs.garage.value" },

    { key: "Suites", from: "attrs.suite.value" },

    { key: "YearBuilt", from: "attrs.year-build.value" },
    {
      key: "DevelopmentLevel",
      from: "attrs.property-status.value",
      handle: (value) => getPropertyStatus(value),
    },
    {
      key: "PropertyAdministrationFee",
      from: "attrs.condominium-price.value",
      handle: (value) => ({
        "@currency": "BRL",
        "#text": value,
      }),
    },
    {
      key: "YearlyTax",
      from: "attrs.property-tax.value",
      handle: (value) => ({ "@currency": "BRL", "#text": value }),
    },
    {
      key: "LotArea",
      from: "attrs.total-area.value",
      handle: (value) => ({
        "@unit": "square metres",
        "#text": value,
      }),
    },
    {
      key: "ConstructedArea",
      from: "attrs.constructed-area.value",
      handle: (value) => ({
        "@unit": "square metres",
        "#text": value,
      }),
    },
    {
      key: "LivingArea",
      from: "attrs.util-area.value",
      handle: (value) => ({
        "@unit": "square metres",
        "#text": value,
      }),
    },
    { key: "UnitNumber", from: "location.number" },
    {
      key: "Features.Feature",
      from: "attrs",
      handle: (attrs) => getFeatures(attrs),
    },
    {
      key: "Location",
      handle: () => {
        return Location;
      },
    },
  ]);

  // -------------------------------------------------------------------

  const data = {
    Listing: map([
      //
      {
        key: "ListingID",
        from: "reference",
        handle: (value) => ({
          "@id": property.id,
          "#text": value,
        }),
      },

      { key: "Title", from: "title" },

      { key: "TransactionType", from: "operation_id" },

      { key: "LastUpdateDate", from: "updatedt_at" },

      { key: "DetailViewUrl", from: "url" },

      { key: "PropertyType", from: "type", handle: ({ id }) => getType(id) },

      {
        key: "ListDate",
        default: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      },

      {
        key: "Media.Item",
        from: "pictures",
        handle: (rows) =>
          rows.map((pic) => ({
            "@medium": "image",
            "#text": pic.fullpath,
            ...getIf(parseInt(pic.display) === 1, () => ({
              "@primary": true,
            })),
          })),
      },

      { key: "Details", default: Details },
    ]),
  };

  if (context.data.returnData) {
    return data;
  }
  return String(builder.create(data).end());
}
