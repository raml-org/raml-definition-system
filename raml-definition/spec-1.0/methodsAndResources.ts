import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")
import Params=require("./parameters")
import Bodies=require("./bodies")
import Common=require("./common")
import Declarations=require("./declarations")
import DataModel=require("./datamodel")
import Api = require("./api")
import Security=require("./security")


///////////////////
//// Trait
//////////////////

export class TraitRef extends Sys.Reference<Trait>{
  trait:Trait
  $trait=[
    MetaModel.customHandling(),
    MetaModel.description("Returns referenced trait")
  ]
}

export class Trait extends MethodBase{
  name:string
  $name=[MetaModel.key(),MetaModel.description("Name of the trait")]

  displayName:string
  $displayName=[
    MetaModel.description("The displayName attribute specifies the trait display name. It is a friendly name used only for  " +
        "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
        "property itself).")
  ]

  usage:string
  $usage = [ MetaModel.description("Instructions on how and when the trait should be used.") ]

  $=[MetaModel.inlinedTemplates(),MetaModel.allowQuestion()]



  parametrizedProperties:DataModel.TypeInstance
  $parametrizedProperties = [
    MetaModel.customHandling(),
    MetaModel.description("Returns object representation of parametrized properties of the trait")
  ]
}

///////////////////
//// Resource Type
//////////////////

export class ResourceTypeRef extends Sys.Reference<ResourceType>{
  resourceType:ResourceType
  $resourceType=[
    MetaModel.customHandling(),
    MetaModel.description("Returns referenced resource type")
  ]
}

export class ResourceType extends ResourceBase  {
  $=[MetaModel.inlinedTemplates(),MetaModel.allowQuestion()]

  displayName:string
  $displayName=[
    MetaModel.description("The displayName attribute specifies the resource type display name. It is a friendly name used only for  " +
        "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
        "property itself).")
  ]

  name:string
  $name=[
    MetaModel.key(),
    MetaModel.description("Name of the resource type")
  ]

  usage:string
  $usage=[
    MetaModel.description("Instructions on how and when the resource type should be used.")
  ]

  

  parametrizedProperties:DataModel.TypeInstance
  $parametrizedProperties = [
    MetaModel.customHandling(),
    MetaModel.description("Returns object representation of parametrized properties of the resource type")
  ]
}

///////////////////
//// Resource
//////////////////

export class ResourceBase extends Annotable{
  methods:Method[];
  $methods=[
    MetaModel.description("Methods that are part of this resource type definition"),
    //MetaModel.issue("definition system did not represents that ? is allowed after method names here"),
    MetaModel.markdownDescription("The methods available on this resource."),
    MetaModel.documentationTableLabel("get?<br>patch?<br>put?<br>post?<br>delete?<br>options?<br>head?<br>trace?<br>connect?"),
    MetaModel.valueDescription("Object describing the method")
  ]

  is:TraitRef[]
  $is=[
    MetaModel.description("A list of the traits to apply to all methods declared (implicitly or explicitly) for this resource. Individual methods may override this declaration"),
    MetaModel.valueDescription("array, which can contain each of the following elements:<br>* name of unparametrized trait " +
      "<br>* a key-value pair with trait name as key and a map of trait parameters as value<br>* inline trait declaration " +
      "<br><br>(or a single element of any above kind)")
  ]

  type:ResourceTypeRef
  $type=[
    MetaModel.description("The resource type which this resource inherits."),
    MetaModel.valueDescription("one of the following elements:<br>* name of unparametrized resource type<br>* a key-value pair " +
      "with resource type name as key and a map of its parameters as value<br>* inline resource type declaration")
  ]

  description: string

  //TODO FIXME
  securedBy:Security.SecuritySchemeRef[]
  $securedBy=[
    MetaModel.allowNull(),
    MetaModel.description("The security schemes that apply to all methods declared (implicitly or explicitly) for this resource."),
    MetaModel.valueDescription("array of security scheme names or a single security scheme name")
  ]


  uriParameters:DataModel.TypeDeclaration[]
  $uriParameters=[
    MetaModel.setsContextValue("location",DataModel.ModelLocation.URI),
    MetaModel.setsContextValue("locationKind",DataModel.LocationKind.APISTRUCTURE),
    MetaModel.setsContextValue("fieldOrParam",true),
    MetaModel.description("Detailed information about any URI parameters of this resource"),
    MetaModel.valueDescription("object whose property names are the URI parameter names and whose values describe the values")
  ]
}

export class Resource extends ResourceBase {
  relativeUri:Sys.RelativeUriString
  $relativeUri=[MetaModel.key(),
    MetaModel.startFrom("/"),
    MetaModel.description("Relative URL of this resource from the parent resource"),
    MetaModel.hide()
  ]

  displayName:string
  $displayName=[
    MetaModel.description("The displayName attribute specifies the resource display name. It is a friendly name used only for  " +
        "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
        "property itself).")
  ]

  resources:Resource[];
  $resources=[
    MetaModel.newInstanceName("New Resource"),
    MetaModel.description("A nested resource is identified as any property whose name begins with a slash (\"/\") and is therefore " +
      "treated as a relative URI."),
    MetaModel.documentationTableLabel("/&lt;relativeUri&gt;"),
    MetaModel.valueDescription("object describing the nested resource")
  ]



  
}

///////////////////
//// Method
//////////////////

export class MethodBase extends Params.HasNormalParameters{
  responses:Bodies.Response[]
  $responses=[
    MetaModel.setsContextValue("response","true"),
    MetaModel.newInstanceName("New Response"),
    MetaModel.description("Information about the expected responses to a request"),
    MetaModel.valueDescription("An object whose keys are the HTTP status codes of the responses and whose values describe the responses.")
  ]

  body:DataModel.TypeDeclaration[]
  $body=[
    MetaModel.newInstanceName("New Body"),
    MetaModel.description("Some method verbs expect the resource to be sent as a request body. For example, to create a resource, " +
      "the request must include the details of the resource to create. Resources CAN have alternate representations. For example, " +
      "an API might support both JSON and XML representations. A method's body is defined in the body property as a hashmap, in " +
      "which the key MUST be a valid media type.")
  ]

  protocols:string[]
  $protocols=[MetaModel.oneOf(["HTTP","HTTPS"]),
    //MetaModel.issue("Not clear how it should work in combination with baseUri also is it also related to resources and types/traits"),MetaModel.needsClarification("Actually it is a set"),
    MetaModel.description("A method can override the protocols specified in the resource or at the API root, by employing this property."),
    MetaModel.valueDescription("array of strings of value HTTP or HTTPS, or a single string of such kind, case-insensitive")
  ]


  is:TraitRef[]
  $is=[MetaModel.description("Instantiation of applyed traits")]

  securedBy:Security.SecuritySchemeRef[]
  $securedBy=[
    MetaModel.allowNull(),
    MetaModel.description("securityScheme may also be applied to a resource by using the securedBy key, which is equivalent " +
      "to applying the securityScheme to all methods that may be declared, explicitly or implicitly, by defining the resourceTypes " +
      "or traits property for that resource. To indicate that the method may be called without applying any securityScheme, the " +
      "method may be annotated with the null securityScheme.")
  ]
}

export class Method extends MethodBase {
  method:string;
  $method=[MetaModel.key(),
    MetaModel.extraMetaKey("methods"),
    MetaModel.oneOf(["get","put","post","delete","options","head","patch","trace","connect"]),
    MetaModel.description("Method that can be called"),
    MetaModel.hide()
  ]

  displayName:string
  $displayName=[
    MetaModel.description("The displayName attribute specifies the method display name. It is a friendly name used only for  " +
        "display or documentation purposes. If displayName is not specified, it defaults to the element's key (the name of the " +
        "property itself).")
  ]

}
