/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": any;
  }
}

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}
