type NodeType = {
  id: string;
  label?: string;
  size?: number;
};

type EdgeType = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: NodeType[];
  edges: EdgeType[];
};
