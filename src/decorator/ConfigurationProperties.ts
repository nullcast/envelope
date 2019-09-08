import config from 'config';
import { deserialize } from 'typescript-json-serializer';

type ConstructorType = new (...args: []) => {};

export default function ConfigurationProperties(
  prefix: string
): (Clazz: ConstructorType) => ConstructorType {
  return (Clazz: ConstructorType): ConstructorType => {
    const configObj = config.get(prefix);
    return class extends Clazz {
      constructor() {
        const self = super();
        Object.assign(self, deserialize(configObj, Clazz));
      }
    };
  };
}
