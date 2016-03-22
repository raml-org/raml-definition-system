import  MetaModel = require("../metamodel")
import Common = require("./common")

export class ValueType {

    /**
     * parses inner structure of value type if value type has invalid value you should throw error
     * with descriptive message
     */
    parse():any{}

}
export class StringType extends ValueType { $=[MetaModel.nameAtRuntime("string")]; value():string{return null} }
export class AnyType extends ValueType { $=[MetaModel.nameAtRuntime("any")]; value():any{return null} }
export class NumberType extends ValueType { $=[MetaModel.nameAtRuntime("number")]}
export class BooleanType extends ValueType{ $=[MetaModel.nameAtRuntime("boolean")]}
/**
 * Tag interface, types implementing this interface
 * are counted as global declarations, and their
 * instances may be referred
 */
export interface Referencable<T>{}
export class Reference<T> extends ValueType{

    structuredValue: TypeInstance
    $structuredValue = [MetaModel.customHandling(), MetaModel.description("Returns a structured object if the reference point to one.")]

    name:string
    $name = [MetaModel.customHandling(), MetaModel.description("Returns name of referenced object")]
}//this is not true ...FIXME

export interface DeclaresDynamicType<T> extends Referencable<T>{}//For now your still required to put declaresSubtype or inlinedTemplates annotation on the classs

export class UriTemplate extends StringType {


    $=[MetaModel.description("This type currently serves both for absolute and relative urls")]

    templateArguments():string[]{
        var pos=0;
        var str=this.value();
        var result=[];
        while(true){
            var start=str.indexOf("{",pos)
            if (start!=-1){
                var end=str.indexOf("}",start+1);
                result.push(str.substring(start+1,end))
                pos=end;
            }
            else{
                break;
            }
        }
        return result;
    }

    validate(){
        var str=this.value();
        //write something to validate Url here
    }
}
export class RelativeUriString extends UriTemplate{
    $=[MetaModel.description("This  type describes relative uri templates")]
    parse():string[]{
        //FIXME INHERITANCE
        var value=this.value();
        var result=[]
        var temp="";
        var inPar=false;
        var count=0;
        for (var a=0;a<value.length;a++){
            var c=value[a];
            if (c=='{'){
                count++;
                inPar=true;
                continue;
            }
            if (c=='}'){
                count--;
                inPar=false;
                result.push(temp);
                temp="";
                continue;
            }
            if (inPar){
                temp+=c;
            }
        }
        if (count>0){
            throw new Error("Unmatched '{'")
        }
        if (count<0){
            throw new Error("Unmatched '}'")
        }
        return result;
    }
}
export class FullUriTemplateString extends UriTemplate{
    $=[MetaModel.description("This  type describes absolute uri templates")]
    parse():string[]{//FIXME INHERITANCE
        var value=this.value();
        var result=[]
        var temp="";
        var inPar=false;
        var count=0;
        for (var a=0;a<value.length;a++){
            var c=value[a];
            if (c=='{'){
                count++;
                inPar=true;
                continue;
            }
            if (c=='}'){
                count--;
                inPar=false;
                result.push(temp);
                temp="";
                continue;
            }
            if (inPar){
                temp+=c;
            }
        }
        if (count>0){
            throw new Error("Unmatched '{'")
        }
        if (count<0){
            throw new Error("Unmatched '}'")
        }
        return result;
    }
    validate(){
        var str=this.value();
        //write something to validate Url here
    }
}
export class FixedUri extends StringType{
    $=[MetaModel.description("This  type describes fixed uris")]
}



export class MarkdownString extends  StringType{
    $=[MetaModel.innerType("markdown"),
        MetaModel.description("Mardown string is a string which can contain markdown as an extension this markdown should support links with RAML Pointers since 1.0")
    ]
}



export class SchemaString extends StringType{

    $=[MetaModel.description("Schema at this moment only two subtypes are supported (json schema and xsd)")]

    validate(){
        var str=this.value();
        //write something to validate schema here here
        //in fact it should check that content is valid json or xsd schema
    }
}

export class JSonSchemaString extends SchemaString{

    $=[MetaModel.functionalDescriminator("this.mediaType&&this.mediaType.isJSON()"),MetaModel.description("JSON schema")]

}
export class XMLSchemaString extends SchemaString{
    $=[MetaModel.innerType("xml"),MetaModel.description("XSD schema")]
}

export class ExampleString extends StringType{

}
export class StatusCodeString extends StringType{

}

export class JSONExample extends ExampleString{
    $=[MetaModel.functionalDescriminator("this.mediaType.isJSON()")]
    $$:any

    parse():any{
        try {
            JSON.parse(this.value());
        } catch (e){
            var ne=new Error("Warning: Can not parse JSON:"+e.message);
            throw ne
        }
        var a=this.$$.parent().attr('schema');
        if (a) {
          var sm=  a.findReferencedValue()
          if (sm&&sm.validate){
              sm.validate(this.value());
          }
        }
    }
}

export class XMLExample extends ExampleString{
    $=[MetaModel.functionalDescriminator("this.mediaType.isXML()")]
}


export class TypeInstance{

    $ = [ MetaModel.customHandling() ];

    properties: TypeInstanceProperty[];
    $properties = [ MetaModel.description("Array of instance properties") ]

    isScalar:boolean;
    $isScalar = [ MetaModel.description("Whether the type is scalar") ]

    value:any;
    $value = [ MetaModel.description("For instances of scalar types returns scalar value") ]
}

export class TypeInstanceProperty{

    $ = [ MetaModel.customHandling() ];

    name:string;
    $name = [ MetaModel.description("Property name") ]

    value:TypeInstance;
    $value = [ MetaModel.description("Property value") ]

    values:TypeInstance[];
    $values = [ MetaModel.description("Array of values if property value is array") ]

    isArray:boolean;
    $isArray = [ MetaModel.description("Whether property has array as value") ]
}