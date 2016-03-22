import  MetaModel = require("../metamodel")
import datamodel = require("./datamodel")
export class ValueType {
    /**
     * parses inner structure of value type if value type has invalid value you should throw error
     * with descriptive message
     */
    parse():any{}


}
export class StringType extends ValueType { $=[MetaModel.nameAtRuntime("string"),MetaModel.alias("string")]; value():string{return null} }
export class AnyType extends ValueType { $=[MetaModel.nameAtRuntime("any"),MetaModel.alias("any")]; value():any{return null} }
export class NumberType extends ValueType { $=[MetaModel.nameAtRuntime("number"),MetaModel.alias("integer"),MetaModel.alias("number")]}
export class BooleanType extends ValueType{ $=[MetaModel.nameAtRuntime("boolean"),MetaModel.alias("boolean")]}//FIXME
/**
 * Tag interface, types implementing this interface
 * are counted as global declarations, and their
 * instances may be referred
 */
export interface Referencable<T>{}
export class Reference<T>  extends ValueType{
    structuredValue: datamodel.TypeInstance
    $structuredValue = [MetaModel.customHandling(),MetaModel.description("Returns a structured object if the reference point to one.")]

    name:string
    $name = [MetaModel.customHandling(),MetaModel.description("Returns name of referenced object")]
}//this is not true ...FIXME

export interface DeclaresDynamicType<T> extends Referencable<T>{}//For now your still required to put declaresSubtype or inlinedTemplates annotation on the classs

export class UriTemplate extends StringType {

    $=[
        MetaModel.description("This type currently serves both for absolute and relative urls")
    ]


}
export class StatusCodeString extends StringType{

}


export class RelativeUriString extends UriTemplate{
    $=[MetaModel.description("This  type describes relative uri templates")]

    //parse():string[]{
    //    var value=this.value();
    //    var result=[]
    //    var temp="";
    //    var inPar=false;
    //    var count=0;
    //    for (var a=0;a<value.length;a++){
    //        var c=value[a];
    //        if (c=='{'){
    //            count++;
    //            inPar=true;
    //            continue;
    //        }
    //        if (c=='}'){
    //            count--;
    //            inPar=false;
    //            result.push(temp);
    //            temp="";
    //            continue;
    //        }
    //        if (inPar){
    //            temp+=c;
    //        }
    //    }
    //    if (count>0){
    //        throw new Error("Unmatched '{'")
    //    }
    //    if (count<0){
    //        throw new Error("Unmatched '}'")
    //    }
    //    return result;
    //}
}
export class FullUriTemplateString extends UriTemplate{
    $=[MetaModel.description("This  type describes absolute uri templates")]
    //parse():string[]{
    //    var value=this.value();
    //    var result=[]
    //    var temp="";
    //    var inPar=false;
    //    var count=0;
    //    for (var a=0;a<value.length;a++){
    //        var c=value[a];
    //        if (c=='{'){
    //            count++;
    //            inPar=true;
    //            continue;
    //        }
    //        if (c=='}'){
    //            count--;
    //            inPar=false;
    //            result.push(temp);
    //            temp="";
    //            continue;
    //        }
    //        if (inPar){
    //            temp+=c;
    //        }
    //    }
    //    if (count>0){
    //        throw new Error("Unmatched '{'")
    //    }
    //    if (count<0){
    //        throw new Error("Unmatched '}'")
    //    }
    //    return result;
    //}

    validate(){
        var str=this.value();
        //write something to validate Url here
    }
}
export class FixedUriString extends StringType{
    $=[MetaModel.description("This  type describes fixed uris")]
}
export class ContentType extends StringType{

}
export class ValidityExpression extends StringType{
    //TODO SPECIFY WHAT CAN NOT BE HERE
}


export class MarkdownString extends  StringType{
    $=[
        MetaModel.innerType("markdown"),
        MetaModel.description("[GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)")
    ]
}
export class DateFormatSpec extends StringType{

}
export class FunctionalInterface extends StringType{

}

export class SchemaString extends StringType{

    $=[MetaModel.description("Schema at this moment only two subtypes are supported (json schema and xsd)"),MetaModel.alias("schema")]

    validate(){
        var str=this.value();
        //write something to validate schema here here
        //in fact it should check that content is valid json or xsd schema
    }
}
export class ExampleString extends StringType{
    $=[MetaModel.description("Examples at this moment only two subtypes are supported (json  and xml)")]

    validate(){
        var str=this.value();
        //write something to validate schema here here
        //in fact it should check that content is valid json or xsd schema
    }
}

export class JSonSchemaString extends SchemaString{
    $=[MetaModel.innerType("json"),MetaModel.description("JSON schema")]
}
export class XMLSchemaString extends SchemaString{
    $=[MetaModel.innerType("xsd"),MetaModel.description("XSD schema")]
}



export class RAMLSelector extends StringType{

}
