import  MetaModel = require("../metamodel")
import  Sys = require("./systemTypes")
import  datamodel=require("./datamodel")
import  common=require("./common")
/////////////////////////////////
// GENERIC GLOBAL DECLARATIONS

export class AnnotationTypeDeclaration extends datamodel.TypeDeclaration implements Sys.DeclaresDynamicType<AnnotationTypeDeclaration>{

    allowMultiple:boolean;
    $allowMultiple=[
        MetaModel.description("Whether multiple instances of annotations of this type may be applied simultaneously at the same location")
    ];

    allowedTargets:AnnotationTarget[]
    $allowedTargets=[
        MetaModel.oneOf(
            [
                "API",
                "DocumentationItem",
                "Resource",
                "Method",
                "Response",
                "RequestBody",
                "ResponseBody",
                "TypeDeclaration",
                "NamedExample",
                "ResourceType",
                "Trait",
                "SecurityScheme",
                "SecuritySchemeSettings",
                "AnnotationTypeDeclaration",
                "Library",
                "Overlay",
                "Extension"
            ]

        ),
        MetaModel.description("Restrictions on where annotations of this type can be applied. If this property is specified, annotations of this type may only be applied on a property corresponding to one of the target names specified as the value of this property."),
        MetaModel.valueDescription("An array of names (or a single name) from the list of Target Names in the [[raml-10-spec-target-locations-table|Target Locations table]]  below. ")
    ]

    usage: string
    $usage = [
        MetaModel.description("Instructions on how and when to use this annotation in a RAML spec."),
        MetaModel.valueDescription("Markdown string")
    ]

    //On the design level every annotation usage is instantiation of subclass of particular AnnotationTypeDeclaration
    //on the runtime level it is just Annotation (which is abstract on  the design level)
    //this inheritance strangeness happens because we do not want bring AnnotationTypeDeclaration fields to Annotation
    //TODO think about it
    $=[
        MetaModel.declaresSubTypeOf("Annotation"),
        MetaModel.declaresSubTypeOf("AnnotationTypeDeclaration")
    ]
}
export class AnnotationRef extends Sys.Reference<AnnotationTypeDeclaration>{
    // TODO: this should have more info on Annotations and their usage
    $=[
        MetaModel.description("Annotations allow you to attach information to your API"),
        MetaModel.tags(['annotations'])
    ]

    annotation:AnnotationTypeDeclaration
    $annotation = [MetaModel.customHandling(),MetaModel.description("Returns referenced annotation")]
}

export class AnnotationTarget extends Sys.ValueType{
    $=[
        // TODO: enum
        MetaModel.description("Elements to which this Annotation can be applied (enum)"),
        MetaModel.tags(['annotations'])
    ]
}



//This type does not exist on RAML design level (basically it's design level counter part is AnnotationRef)
export class Annotation<T>{
    name:string

    $name=[MetaModel.key()]
}

export class ArrayAnnotationTypeDeclaration extends datamodel.ArrayTypeDeclaration {

    $ = [ MetaModel.superclasses(["AnnotationTypeDeclaration"]) ];

}

export class UnionAnnotationTypeDeclaration extends datamodel.UnionTypeDeclaration {

    $ = [ MetaModel.superclasses(["AnnotationTypeDeclaration"]) ];
}

export class ObjectAnnotationTypeDeclaration extends datamodel.ObjectTypeDeclaration {

    $ = [ MetaModel.superclasses(["AnnotationTypeDeclaration"]) ];

}

export class StringAnnotationTypeDeclaration extends datamodel.StringTypeDeclaration {

    $ = [ MetaModel.superclasses(["ValueAnnotationTypeDeclaration"]) ];

}

export class BooleanAnnotationTypeDeclaration extends datamodel.BooleanTypeDeclaration {

    $ = [ MetaModel.superclasses(["ValueAnnotationTypeDeclaration"]) ];

}

export class ValueAnnotationTypeDeclaration extends datamodel.ValueTypeDeclaration {

    $ = [ MetaModel.superclasses(["AnnotationTypeDeclaration"]) ];

}

export class NumberAnnotationTypeDeclaration extends datamodel.NumberTypeDeclaration {

    $ = [ MetaModel.superclasses(["ValueAnnotationTypeDeclaration"]) ];

}

export class RAMLExpressionAnnotation extends datamodel.RAMLExpression {

    $ = [ MetaModel.superclasses(["AnnotationTypeDeclaration"]) ];

}

export class DateTypeAnnotationDeclaration extends datamodel.DateTypeDeclaration {

    $ = [ MetaModel.superclasses(["AnnotationTypeDeclaration"]) ];

}