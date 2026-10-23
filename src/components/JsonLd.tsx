/**
 * Renders one or more JSON-LD graphs as script tags.
 */
export function JsonLd({ data }: { data: object | object[] }) {
    const graphs = Array.isArray(data) ? data : [data];
    return (
        <>
            {graphs.map((graph, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(graph),
                    }}
                />
            ))}
        </>
    );
}
