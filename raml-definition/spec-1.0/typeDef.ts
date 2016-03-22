interface IProperty{
    name:string
    range: string
}
interface ITypeDef{
  name: string
  properties: IProperty[]
  extends: string;
}
