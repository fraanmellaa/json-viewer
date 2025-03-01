import { useState } from "react";

interface JsonViewerProps {
  data: Record<string, JsonData> | JsonData[];
  depth?: number;
  path?: string[];
  ui?: JsonViewerUI;
}

type JsonData =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonData[]
  | { [key: string]: JsonData };

type FontStyle = {
  family?: string;
  weight?: string;
  size?: string;
};

type JsonViewerUI = {
  font?: { key?: FontStyle; value?: FontStyle } | FontStyle;
  keyColor?: string;
  valueColor?: string | { [key: string]: string };
  nullColor?: string;
  backgroundColor?: string;
  keyClass?: string;
  valueClass?: string;
  containerClass?: string;
};

const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  depth = 0,
  path = [],
  ui,
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const formattedData =
    depth === 0 && Array.isArray(data) ? { value: data } : data;

  const isExpandable = (
    value: string | number | boolean | null | JsonData
  ): boolean => {
    if (Array.isArray(value) && !value.length) return false;
    return (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length > 0
    );
  };

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
  const getPreview = (
    value: Record<string, JsonData> | JsonData[]
  ): JSX.Element => {
    const count = Array.isArray(value)
      ? value.length
      : Object.keys(value).length;
    const openingBrace = Array.isArray(value) ? "[" : "{";
    const closingBrace = Array.isArray(value) ? "]" : "}";
    return (
      <span className="text-gray-500">
        {openingBrace} {count} {count <= 1 ? "item" : "items"} {closingBrace}
      </span>
    );
  };

  const keyFont: FontStyle | undefined =
    ui?.font && "key" in ui.font ? ui.font.key : (ui?.font as FontStyle);
  const valueFont: FontStyle | undefined =
    ui?.font && "value" in ui.font ? ui.font.value : (ui?.font as FontStyle);

  const getValueColor = (
    value: string | number | boolean | null | JsonData,
    ui?: JsonViewerUI
  ): string => {
    // Determine color for value based on type
    if (value === null) {
      return ui?.nullColor || "#ff7b72"; // Use nullColor if set
    }

    // Handle custom colors for different types
    if (typeof value === "string") {
      return ui?.valueColor &&
        typeof ui.valueColor === "object" &&
        ui.valueColor.string
        ? (ui.valueColor.string as string)
        : (ui?.valueColor as string) || "#79c0ff"; // Default color or specific string color
    }
    if (typeof value === "number") {
      return ui?.valueColor &&
        typeof ui.valueColor === "object" &&
        ui.valueColor.number
        ? ui.valueColor.number
        : "#d4de80"; // Default color for numbers
    }
    if (typeof value === "boolean") {
      return ui?.valueColor &&
        typeof ui.valueColor === "object" &&
        ui.valueColor.boolean
        ? ui.valueColor.boolean
        : "#ffcc66"; // Default color for booleans
    }
    return "inherit";
  };

  return (
    <div
      className={
        depth === 0
          ? `${
              ui?.containerClass ||
              "p-4 rounded-md shadow-lg backdrop-blur-lg bg-white/30"
            }`
          : ""
      }
      style={{
        backgroundColor:
          depth === 0
            ? ui?.backgroundColor || "rgba(255, 255, 255, 0.1)"
            : "transparent",
      }}
    >
      {Object.entries(formattedData).map(([key, value]) => {
        const nodeId = getNodeId(key);
        return (
          <div key={nodeId} className="mb-1">
            <div
              className={`flex items-start py-1 group ${
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
                    color: ui?.keyColor || "#2563eb",
                    fontFamily: keyFont?.family,
                    fontWeight: keyFont?.weight,
                    fontSize: keyFont?.size,
                  }}
                  className={ui?.keyClass || "font-semibold"}
                >
                  {key}
                </span>
                <span className="mx-1 text-gray-500">:</span>
                <span
                  style={{
                    color: getValueColor(value, ui),
                    fontFamily: valueFont?.family,
                    fontWeight: valueFont?.weight,
                    fontSize: valueFont?.size,
                  }}
                  className={ui?.valueClass || "break-all"}
                >
                  {isExpandable(value)
                    ? !expanded.has(nodeId)
                      ? getPreview(
                          value as Record<string, JsonData> | JsonData[]
                        )
                      : ""
                    : getPreview(
                        value as Record<string, JsonData> | JsonData[]
                      )}
                </span>
              </div>
            </div>

            {isExpandable(value) && expanded.has(nodeId) && (
              <div className="ml-4 pl-4 ">
                <JsonViewer
                  data={value as Record<string, JsonData> | JsonData[]}
                  depth={depth + 1}
                  path={[...path, key]}
                  ui={ui}
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
