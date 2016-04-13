import  MetaModel = require("../metamodel")
import  Sys = require("./systemTypes")
import  Decls=require("./declarations")

/**
 * Created by kor on 07/07/15.
 */
export class RAMLLanguageElement {
  

  description:Sys.MarkdownString
  $description=[
    MetaModel.description("The description attribute describes the intended use or meaning of the $self. This value MAY be formatted using Markdown [MARKDOWN]")
  ]

  annotations:Decls.AnnotationRef[]
  $annotations=[
    MetaModel.noDirectParse(),
    MetaModel.setsContextValue("locationKind","datamodel.LocationKind.APISTRUCTURE"),
    MetaModel.setsContextValue("location","datamodel.ModelLocation.ANNOTATION"),
    MetaModel.description("Most of RAML model elements may have attached annotations decribing additional meta data about this element"),
    MetaModel.documentationTableLabel("(&lt;annotationName&gt;)"),
    MetaModel.valueDescription("A value corresponding to the declared type of this annotation.")
  ]
  //TODO FIX DESCRIPTION
}

