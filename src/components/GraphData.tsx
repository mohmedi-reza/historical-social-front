import React, { useState, useRef } from "react";
type NodeType = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type EdgeType = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: NodeType[];
  edges: EdgeType[];
};
const Graph: React.FC<{ data: GraphData }> = ({ data }) => {
  const [nodes, setNodes] = useState<NodeType[]>(data.nodes);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleDrag = (
    event: React.MouseEvent<SVGCircleElement>,
    id: string
  ) => {
    event.preventDefault();
    const newNodes = nodes.map((node) =>
      node.id === id
        ? { ...node, x: event.clientX - 50, y: event.clientY - 50 }
        : node
    );
    setNodes(newNodes);
  };

  return (
    <svg ref={svgRef} width={800} height={600} className="bg-gray-100">
      {/* خطوط اتصال */}
      {data.edges.map((edge, index) => {
        const source = nodes.find((node) => node.id === edge.source);
        const target = nodes.find((node) => node.id === edge.target);
        if (!source || !target) return null;
        return (
          <line
            key={index}
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            stroke="black"
            strokeWidth="2"
          />
        );
      })}

      {/* نودها */}
      {nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x},${node.y})`}>
          <circle
            r="20"
            fill={node.id === "central" ? "red" : "blue"}
            onMouseMove={(event) => handleDrag(event, node.id)}
            style={{ cursor: "grab" }}
          />
          <text x="-10" y="5" fill="white">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Graph;
