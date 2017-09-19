/**
 * Created by kor on 26/06/15.
 */
"use strict";
/////////////////////////////////////////////
//   Property semantic constraints         //
/**
 * declares that annotated property may only
 * have values that are members of args array
 * @param args
 */
function oneOf(args) { }
exports.oneOf = oneOf;
;
/**
 * declares default value for a simple property
 * (works only for strings)
 * @param v
 */
function defaultValue(v) { }
exports.defaultValue = defaultValue;
/**
 * declares default value for a simple property
 * (works only for numbers)
 * @param v
 */
function defaultIntegerValue(v) { }
exports.defaultIntegerValue = defaultIntegerValue;
/**
 * declares default value for a simple property
 * (works only for booleans)
 * @param v
 */
function defaultBooleanValue(v) { }
exports.defaultBooleanValue = defaultBooleanValue;
/**
 * declares that values of annotated property
 * should start from 'value' argument value
 * @param value
 */
function startFrom(value) { }
exports.startFrom = startFrom;
function facetId(value) { }
exports.facetId = facetId;
/**
 * marks that annotated field represent object key
 * in yaml parsing values for annotated field will be taken
 * from mapping key
 *
 * For example when parsing folloeing yaml mapping
 * offset:
 *   type:string
 *   default:10
 *
 * to object model value of property annotated with key will be offset
 *
 */
function key() { }
exports.key = key;
/**
 * marks that annotated field represent object key
 * in yaml parsing values for annotated field will be taken
 * from mapping key
 *
 * For example when parsing folloeing yaml mapping
 * offset:
 *   type:string
 *   default:10
 *
 * to object model value of property annotated with key will be offset
 *
 */
function value() { }
exports.value = value;
/**
 * marks that annotated field represent object key
 * in yaml parsing values for annotated field will be taken
 * from mapping key
 *
 * For example when parsing following yaml mapping
 * offset:
 *   type:string
 *   default:10
 *
 * to object model value of property annotated with key will be offset
 *
 */
function canBeValue() { }
exports.canBeValue = canBeValue;
function allowMultiple() { }
exports.allowMultiple = allowMultiple;
/**
 * suggested keys
 * @param args
 */
function oftenKeys(args) { }
exports.oftenKeys = oftenKeys;
/**
 * This annotation marks annotated property
 * as a property whose values contains field declarations
 * for the type defined by property domain instance
 * may be only applied to members of classes which are annotated
 * with 'declaresSubTypeOf' and contribute to 'open typesystem'
 */
function declaringFields() { }
exports.declaringFields = declaringFields;
/**
 * This annotation marks annotated property as
 * descriminator property for owning type subclasses
 * it also means that annotated property can have only values
 * coming from constraints applied in subclasses to it or
 * names of subclasses classes defined in open part of typesystem
 */
function descriminatingProperty() { }
exports.descriminatingProperty = descriminatingProperty;
/**
 * marks annotated property as required
 */
function required() { }
exports.required = required;
/**
 * This annotation sets context value for annotated field
 * values and for their children (recursively)
 * @param field - name of context value
 * @param value - value of context value
 */
function setsContextValue(field, value) { }
exports.setsContextValue = setsContextValue;
/**
 * marks annotated property as a system property
 * this means that property value will be inherited
 * from context value with same name as annotated property has
 * also user will not be able to change value of annotated property
 */
function system() { }
exports.system = system;
/**
 * marks that value of key property may be inherited from context value
 * in this case node may be embedded in parent ast node
 * @param contextValue
 */
function canInherit(contextValue) { }
exports.canInherit = canInherit;
/**
 * very custom case only needed for multiple parameter types
 */
function canBeDuplicator() { }
exports.canBeDuplicator = canBeDuplicator;
/**
 * marks that annotated property is equivalent to placing
 * annotation with name equal to value of 'name' argument
 * and the argument equal to property value
 * can only be used to mark properties of the range of
 * the property annotated with 'declaringFields' annotation
 * @param name
 */
function describesAnnotation(name) { }
exports.describesAnnotation = describesAnnotation;
/**
 * this annotation allows configure label for new value action
 * which is associated with this property
 * TODO move it to class level annotations
 * @param n
 */
function newInstanceName(n) { }
exports.newInstanceName = newInstanceName;
/**
 * This annotation is persistence related and means
 * that property values are stored in map
 * only can be aplied to  properties with multiple values
 *
 *
 */
function embeddedInMaps() { }
exports.embeddedInMaps = embeddedInMaps;
function description(text) { }
exports.description = description;
/**
 * description string allowed to contain markdown and links
 **/
function markdownDescription(text) { }
exports.markdownDescription = markdownDescription;
/**
 * description of value type. Appears in documentation instead of range type signature
 **/
function valueDescription(text) { }
exports.valueDescription = valueDescription;
/**
 * specifies that this property sets its value into context
 */
function inherited() { }
exports.inherited = inherited;
;
function selfNode() { }
exports.selfNode = selfNode;
;
function noDirectParse() { }
exports.noDirectParse = noDirectParse;
/////////////////////////////////////////////
/////////////////////////////////////////////////////////
//   Class annotations
/**
 * marks the class as class whose instances contribute
 * types to the open type system. Contributed types
 * will be subclasses of class with name equal to value of 'superTypeName' argument
 * properties of contributed types will be discovered from the values of property
 * annotated with 'declaringFields' annotation
 * @param superTypeName
 */
function declaresSubTypeOf(superTypeName) { }
exports.declaresSubTypeOf = declaresSubTypeOf;
/**
 * marks the class as class whose instances contribute types to the 'open type system'
 * Contributed types will not have any super types. Their properties will be calculated
 * based on <<propertyName>> template usage in values of properties of
 * instances who contribute types to 'open type system'
 */
function inlinedTemplates() { }
exports.inlinedTemplates = inlinedTemplates;
;
/**
 * this annotation should be applied to value types and means that this value type
 * has internal structured content which may be parsed from value string.
 * TODO More doc
 * @param n
 */
function innerType(n) { }
exports.innerType = innerType;
;
/**
 * This annotation means that instances of class may only placed
 * in the places of hierarchy where context value with a name equal
 * to value of 'field' argument is available and equal to value
 * of 'value' argument
 * @param field
 * @param value
 */
function requireValue(field, value) { }
exports.requireValue = requireValue;
function extraMetaKey(name) { }
exports.extraMetaKey = extraMetaKey;
/**
 * this annotation means that this class is already defined at runtime
 * level with name equal to 'name' argument value
 * @param name
 */
function nameAtRuntime(name) { }
exports.nameAtRuntime = nameAtRuntime;
function alias(name) { }
exports.alias = alias;
/**
 * This annotation may be placed on types which implements Referanceable
 * interface. It means that instantiating this class exports
 * value of the field whose name is passed in 'name' argument to the global context instead
 * of exporting the object
 * @param name
 */
function actuallyExports(name) { }
exports.actuallyExports = actuallyExports;
;
function functionalDescriminator(expr) { }
exports.functionalDescriminator = functionalDescriminator;
;
function allowNull() { }
exports.allowNull = allowNull;
function referenceIs(fieldName) { }
exports.referenceIs = referenceIs;
/**
 * This annotations means that given node can have any nodes as its children
 */
function allowAny() { }
exports.allowAny = allowAny;
/**
 * This annotations means that given node can have question at the end of keys of child not primitive nodes
 */
function allowQuestion() { }
exports.allowQuestion = allowQuestion;
function convertsToGlobalOfType(name) { }
exports.convertsToGlobalOfType = convertsToGlobalOfType;
;
function consumesRefs() { }
exports.consumesRefs = consumesRefs;
function definingPropertyIsEnough(v) { }
exports.definingPropertyIsEnough = definingPropertyIsEnough;
/**
 * Hide property
 */
function hide(value) {
    if (value === void 0) { value = true; }
}
exports.hide = hide;
/**
 * Marks this class as (hidden)
 */
function internalClass() { }
exports.internalClass = internalClass;
/**
 * Value used as title in documentation table
 **/
function documentationTableLabel(value) { }
exports.documentationTableLabel = documentationTableLabel;
/////////////////////////////////////////////////////////
/////////////////////////////////////////////
//               General                   //
/**
 * For documentation generators
 * @param tags
 */
function tags(tags) { }
exports.tags = tags;
/**
 * declares implementation of the class or property is handled in a custom way on top level
 * (works only for booleans)
 * @param v
 */
function customHandling() { }
exports.customHandling = customHandling;
/**
 * List of additional inherited classes
 */
function superclasses(classNames) { }
exports.superclasses = superclasses;
/**
 * List of interfaces which can be implemented by the type depending on context
 */
function possibleInterfaces(classNames) { }
exports.possibleInterfaces = possibleInterfaces;
function typeExpression() { }
exports.typeExpression = typeExpression;
;
function example() { }
exports.example = example;
;
