import { useState } from "react";

interface JsonViewerProps {
  data:
    | Array<Record<string, string | number | boolean | null | JsonData>>
    | Record<string, string | number | boolean | null | JsonData>;
  depth?: number;
  path?: string[];
  styles?: JsonViewerStyles;
}

type JsonData = { [key: string]: string | number | boolean | null | JsonData };

type FontStyle = {
  family?: string;
  weight?: string;
  size?: string;
};

type JsonViewerStyles = {
  font?: { key?: FontStyle; value?: FontStyle } | FontStyle;
  keyColor?: string;
  valueColor?: string;
  backgroundColor?: string;
};

const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  depth = 0,
  path = [],
  styles,
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const isExpandable = (
    value: string | number | boolean | null | JsonData
  ): boolean => typeof value === "object" && value !== null;

  const toggleExpand = (key: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpanded(newExpanded);
  };

  const getNodeId = (key: string): string => [...path, key].join(".");
  const getPreview = (value: JsonData): JSX.Element => {
    const count = Object.keys(value).length;
    return (
      <span className="text-gray-500">
        ({count} {count === 1 ? "item" : "items"})
      </span>
    );
  };
  const formatValue = (value: string | number | boolean | null): string =>
    JSON.stringify(value);

  const keyFont: FontStyle | undefined =
    styles?.font && "key" in styles.font
      ? styles.font.key
      : (styles?.font as FontStyle);
  const valueFont: FontStyle | undefined =
    styles?.font && "value" in styles.font
      ? styles.font.value
      : (styles?.font as FontStyle);

  return (
    <div
      className="p-2 rounded-lg"
      style={{ backgroundColor: styles?.backgroundColor || "white" }}
    >
      {Object.entries(data).map(([key, value]) => {
        const nodeId = getNodeId(key);
        return (
          <div key={nodeId} className="mb-1">
            <div
              className={`flex items-center py-1 group ${
                isExpandable(value) ? "cursor-pointer" : ""
              }`}
              onClick={() => isExpandable(value) && toggleExpand(nodeId)}
            >
              <div className="flex items-center">
                {isExpandable(value) ? (
                  <div
                    className={`w-4 h-4 mr-1 mt-1 flex items-center justify-center transition-transform ${
                      expanded.has(nodeId) ? "rotate-90" : ""
                    }`}
                  >
                    <svg
                      className="w-3 h-3 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-4 mr-1"></div>
                )}
              </div>

              <div className="flex-1">
                <span
                  style={{
                    color: styles?.keyColor || "#2563eb",
                    fontFamily: keyFont?.family,
                    fontWeight: keyFont?.weight,
                    fontSize: keyFont?.size,
                  }}
                  className="font-semibold"
                >
                  {key}
                </span>
                <span className="mx-1 text-gray-500">:</span>
                <span
                  style={{
                    color: styles?.valueColor || "#111827",
                    fontFamily: valueFont?.family,
                    fontWeight: valueFont?.weight,
                    fontSize: valueFont?.size,
                  }}
                  className="break-all"
                >
                  {isExpandable(value)
                    ? !expanded.has(nodeId)
                      ? getPreview(value as JsonData)
                      : ""
                    : formatValue(value as string | number | boolean | null)}
                </span>
              </div>
            </div>

            {isExpandable(value) && expanded.has(nodeId) && (
              <div className="ml-4 pl-4 border-l border-gray-400 ">
                <JsonViewer
                  data={value as JsonData}
                  depth={depth + 1}
                  path={[...path, key]}
                  styles={styles}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JsonViewer;
