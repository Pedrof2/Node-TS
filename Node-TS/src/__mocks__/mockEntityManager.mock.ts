import { EntityManager } from "typeorm";

interface mockManagerArgs{
    saveReturn?: object | [object]
}

export const getMockEntityManager = async ({
    saveReturn = undefined
}:mockManagerArgs) : Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {}

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn)) //mockando a chamada da função

    return manager as EntityManager;
};