import { Episode } from './model/episode';
import { Host } from './model/host';

export type EpisodeThread = Pick<Episode, 'date' | 'number' | 'type'>;

export class Fiber {
    private hosts: Map<string, Host> = new Map();

    addHost(host: Host): this {
        // this.hosts.has(host.name) ?
        this.hosts.set(host.name, { ...this.hosts.get(host.name), ...host });
        return this;
    }
}
