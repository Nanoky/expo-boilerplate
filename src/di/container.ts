type Factory<T> = () => T;

class Container {
    private registry = new Map<symbol, Factory<any>>();

    register<T>(token: symbol, factory: Factory<T>) {
        this.registry.set(token, factory);
    }

    resolve<T>(token: symbol): T {
        const factory = this.registry.get(token);
        if (!factory) throw new Error(`No provider for ${String(token)}`);
        return factory();
    }
}

export const container = new Container();