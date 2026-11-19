/**
 * Renders one or more JSON-LD objects. `<` is escaped so content can never close the
 * <script> tag early (prevents script injection through data).
 */
export default function JsonLd({ data }) {
  const items = Array.isArray(data) ? data : [data];
  return items.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
    />
  ));
}
