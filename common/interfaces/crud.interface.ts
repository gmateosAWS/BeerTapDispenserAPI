export interface CRUD {
    create: (resource: any) => Promise<any>;
    getById: (id: string) => Promise<any>;
    patchById: (id: string, resource: any) => Promise<string>;
}