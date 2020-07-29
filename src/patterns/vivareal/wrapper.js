import builder from "xmlbuilder";
import { getMapper } from "./helpers";
import moment from "moment";

export default function (data, rows) {
  const { map } = getMapper(data);

  let xml = {
    ListingDataFeed: {
      "@xmlns": "http://www.vivareal.com/schemas/1.0/VRSync",
      "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@xsi:schemaLocation":
        "http://www.vivareal.com/schemas/1.0/VRSync http://xml.vivareal.com/vrsync.xsd",
      //
      Heading: map([
        { key: "Provider", default: data.name },
        { key: "ContactName", default: data.name },
        { key: "Email", default: data.email },
        { key: "PublishDate", default: moment().format() },
      ]),
      Listings: { "#text": "[slot]" },
    },
  };

  xml = String(builder.create(xml).end());

  return xml.replace("[slot]", rows);
}
