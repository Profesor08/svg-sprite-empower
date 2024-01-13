export class ApiBase {
  protected readonly events = new Set<Api.EventHandler>();

  public readonly on = <Handler extends Api.EventHandler>(
    name: Handler["name"],
    listener: Handler["listener"],
  ) => {
    const handler = {
      name,
      listener,
    };

    this.events.add(handler);

    return () => {
      this.events.delete(handler);
    };
  };

  public readonly once = <Handler extends Api.EventHandler>(
    name: Handler["name"],
    listener: Handler["listener"],
  ) => {
    const handler = {
      name,
      listener: (...args: unknown[]) => {
        listener(...args);

        this.events.delete(handler);
      },
    };

    this.events.add(handler);

    return () => {
      this.events.delete(handler);
    };
  };
}
