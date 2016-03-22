import  MetaModel = require("../metamodel")
import  Sys = require("./systemTypes")
import  models=require("./datamodel")
import Common=require("./common")

export interface MimeTypeModel{
    type:string
    tree?:string
    subtype:string;
    suffix?:string;
    parameters?:string;
}
export class MimeType extends Sys.StringType{
    isForm(){
        if (this.value()=="application/x-www-form-urlencoded"||this.value()=='multipart/form-data'){
            return true;
        }
        //TODO USE PARSE
        return false;//more smart code here
    }

    isXML(){
        //TODO USE PARSE

        if (this.value()=="application/xml"){
            return true;
        }
        return false;//more smart code here
    }

    isJSON(){
        //TODO USE PARSE

        if (this.value()=="application/json"){
            return true;
        }
        return false;//more smart code here
    }
    $=[MetaModel.description("This sub type of the string represents mime types")]

    //parse(){
    //    /**
    //     * top-level type name / subtype name [ ; parameters ]
    //     *
    //     * top-level type name / [ tree. ] subtype name [ +suffix ] [ ; parameters ]
    //     */
    //    var v=this.value();
    //    if (v=="*/*"){
    //        return
    //    }
    //    var res= mediaTypeParser.parse(v);
    //    var types={application:1, audio:1, example:1, image:1, message:1, model:1, multipart:1, text:1, video:1}
    //    if (!types[res.type]){
    //        throw new Error("Unknown media type 'type' value")
    //    }
    //}
}
//export class BodyExampleSpec extends Common.RAMLLanguageElement{
//    content:Sys.ExampleString
//    $content=[MetaModel.selfNode()]
//    strict:boolean
//    name:string
//    $name=[MetaModel.key()];
//}

/////////////////////////////////////////////////////////
// This section is related to bodies
//export class BodyLike extends Common.RAMLLanguageElement{
//    mediaType:MimeType
//    $mediaType=[MetaModel.key(),MetaModel.description("Mime type of the request or response body"),MetaModel.oftenKeys(["application/json","application/xml"
//        ,"application/x-www-form-urlencoded",
//        "multipart/formdata"])]
//    schema:Sys.SchemaString
//    //FIXME forms, references to global schemas should also be represented here
//    $schema=[
//
//        MetaModel.requireValue("this.mediaType.isForm()","false"),MetaModel.description(`
//    The structure of a request or response body MAY be further specified by the schema property under the appropriate media type.
//
//The schema key CANNOT be specified if a body's media type is application/x-www-form-urlencoded or multipart/form-data.
//
//All parsers of RAML MUST be able to interpret JSON Schema [JSON_SCHEMA] and XML Schema [XML_SCHEMA].
//
//Schema MAY be declared inline or in an external file. However, if the schema is sufficiently large so as to make it difficult for a person to read the API definition, or the schema is reused across multiple APIs or across multiple miles in the same API, the !include user-defined data type SHOULD be used instead of including the content inline.
//Alternatively, the value of the schema field MAY be the name of a schema specified in the root-level schemas property (see Named Parameters, or it MAY be declared in an external file and included by using the by using the RAML !include user-defined data type.`)]
//    example:Sys.ExampleString
//    $example=[MetaModel.selfNode(),
//        MetaModel.issue("https://github.com/raml-org/raml-spec/issues/75"),
//        MetaModel.issue("https://github.com/raml-org/raml-spec/issues/24"),
//        MetaModel.description(`Documentation generators MUST use body properties' example attributes to generate example invocations.
//
//
//
//This example shows example attributes for two body property media types.`),
//        MetaModel.issue("https://github.com/raml-org/raml-spec/issues/107"),
//        MetaModel.needsClarification("Multiple examples"),MetaModel.issue("https://github.com/raml-org/raml-spec/issues/113")]
//
//    examples:BodyExampleSpec[]
//
//    type: Sys.SchemaString
//
//
//    formParameters:models.TypeDeclaration[]
//    //this field checks context guard and sets another context guard
//    //TODO mime types are open actually open enums are not handled context values are not looked in normal ast not
//    //
//    $formParameters=[ MetaModel.setsContextValue("fieldOrParam",true),MetaModel.requireValue("this.mediaType.isForm()","true"),MetaModel.setsContextValue("location",models.ModelLocation.FORM),
//        MetaModel.setsContextValue("locationKind",models.LocationKind.APISTRUCTURE),MetaModel.description(`Web forms REQUIRE special encoding and custom declaration.
//If the API's media type is either application/x-www-form-urlencoded or multipart/form-data, the formParameters property MUST specify the name-value pairs that the API is expecting.
//The formParameters property is a map in which the key is the name of the web form parameter, and the value is itself a map the specifies the web form parameter's attributes`)]
//
//    $=[MetaModel.canInherit("mediaType")]
//}
//export class Body extends BodyLike{
//
//}

////Later we will attach functionality which is specific for XMLBody and JSONBody at this moment they are the same
//export class XMLBody extends Body{
//    //mime="application/xml"
//    $schema=[MetaModel.description("XSD Schema")]
//
//    schema:Sys.XMLSchemaString
//
//    $=[MetaModel.functionalDescriminator("this.mediaType.isXML()"),MetaModel.description("Needed to set connection between xml related mime types and xsd schema")]
//}
//
//export class JSONBody extends Body{
//
//   schema:Sys.JSonSchemaString
//   $schema=[MetaModel.description("JSON Schema")]
//
//    $=[MetaModel.functionalDescriminator("this.mediaType.isJSON()"),MetaModel.description("Needed to set connection between json related mime types and json schema")
//    ,MetaModel.issue("https://github.com/raml-org/raml-spec/issues/160"),MetaModel.issue("https://github.com/raml-org/raml-spec/issues/81")]
//    //mime="application/json"
//}

//TODO CHECK if it all actually extends RAML Language element
export class Response extends Common.RAMLLanguageElement{
    code:Sys.StatusCodeString
    $code=[
        MetaModel.key(),
        MetaModel.extraMetaKey("statusCodes"),
        MetaModel.description("Responses MUST be a map of one or more HTTP status codes, where each status code itself is a map that describes that status code."),
        MetaModel.hide()
    ]

    headers:models.TypeDeclaration[];
    $headers=[ MetaModel.setsContextValue("fieldOrParam",true),MetaModel.setsContextValue("location",models.ModelLocation.HEADERS),
        MetaModel.setsContextValue("locationKind",models.LocationKind.APISTRUCTURE),
        MetaModel.newInstanceName("New Header"),
        MetaModel.description("Detailed information about any response headers returned by this method"),
        MetaModel.valueDescription("Object whose property names are the response header names and whose values describe the values.")
    ]

    body:models.TypeDeclaration[]
    $body=[
        MetaModel.newInstanceName("New Body"),
        MetaModel.description("The body of the response: a body declaration"),
        MetaModel.valueDescription("Object whose properties are either<br>* Media types and whose values are type objects describing the request body for that media type, or<br>* a type object describing the request body for the default media type specified in the root mediaType property.")
    ]

    $displayName =[MetaModel.description("An alternate, human-friendly name for the response")]

    $description=[
        MetaModel.description("A longer, human-friendly description of the response"),
        MetaModel.valueDescription("Markdown string")
    ]

    $annotations = [
        MetaModel.markdownDescription("Annotations to be applied to this response. Annotations are any property whose key begins with \"(\" and ends with \")\" and whose name (the part between the beginning and ending parentheses) is a declared annotation name. See the [[raml-10-spec-annotations|section on annotations]].")
    ]
}
