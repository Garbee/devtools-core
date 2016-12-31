// @flow

/**
 * Breakpoint ID
 *
 * @memberof types
 * @static
 */
export type BreakpointId = string;

/**
 * Source ID
 *
 * @memberof types
 * @static
 */
export type SourceId = string;

/**
 * Actor ID
 *
 * @memberof types
 * @static
 */
export type ActorId = string;

/**
 * Source File Location
 *
 * @memberof actions/types
 * @static
 */
export type Location = {
  sourceId: SourceId,
  line: number,
  column?: number
};

/**
 * Location of an actual event, when breakpoints are set they are requested
 * at one location but the server will respond with the "actual location" where
 * the breakpoint was really set if it differs from the requested location.
 *
 * @memberof actions/types
 * @static
 */
export type ActualLocation = {
  source: { actor: ActorId },
  line: number,
  column?: number
};

/**
 * Breakpoint
 *
 * @memberof actions/types
 * @static
 */
export type Breakpoint = {
  id: BreakpointId,
  location: Location,
  loading: boolean,
  disabled: boolean,
  text: string,
  condition: ?string,
};

/**
 * BreakpointResult
 *
 * @memberof actions/types
 * @static
 */
export type BreakpointResult = {
  id: ActorId,
  actualLocation: Location
};

/**
 * Source
 *
 * @memberof types
 * @static
 */
export type Source = {
  id: SourceId,
  url?: string,
  sourceMapURL?: string
};

/**
 * Frame ID
 *
 * @memberof types
 * @static
 */
export type FrameId = string;

/**
 * Frame
 * @memberof types
 * @static
 */
export type Frame = {
  id: FrameId,
  displayName: string,
  location: Location,
  source: Source,
  scope: Scope,
  // FIXME Define this type more clearly
  this: Object
};

/**
 * Scope
 * @memberof types
 * @static
 */
export type Scope = {
  actor: ActorId,
  parent: Scope,
  bindings: {
      // FIXME Define these types more clearly
      arguments: Array<Object>,
      variables: Object
  },
  function: {
      actor: ActorId,
      class: string,
      displayName: string,
      location: Location,
      // FIXME Define this type more clearly
      parameterNames: Array<Object>
  },
  type: string
};

/**
 * Grip
 * @memberof types
 * @static
 */
export type Grip = {

}

/**
 * SourceClient
 * @memberof types
 * @static
 */
export type SourceClient = {
  source: () => Source,
  setBreakpoint: ({ line: number, column?: number, condition: boolean, noSliding: boolean}) => Promise<any>,
  prettyPrint: (number) => Promise<*>,
  disablePrettyPrint: () => Promise<*>
};

/**
 * ObjectClient
 * @memberof types
 * @static
 */
export type ObjectClient = {
  getPrototypeAndProperties: () => any
};

/**
 * ThreadClient
 * @memberof types
 * @static
 */
export type ThreadClient = {
  resume: (Function) => Promise<*>,
  stepIn: (Function) => Promise<*>,
  stepOver: (Function) => Promise<*>,
  stepOut: (Function) => Promise<*>,
  breakOnNext: () => Promise<*>,
  source: ({ actor: SourceId }) => SourceClient,
  pauseGrip: (Grip|Function) => ObjectClient,
  pauseOnExceptions: (boolean, boolean) => Promise<*>,
  interrupt: () => Promise<*>,
  eventListeners: () => Promise<*>
}

/**
 * BreakpointClient
 * @memberof types
 * @static
 */
export type BreakpointClient = {
  actor: string,
  remove: () => void,
  setCondition: (ThreadClient, boolean, boolean) => Promise<BreakpointClient>
};
