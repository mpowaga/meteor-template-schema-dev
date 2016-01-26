TemplateSchema = function (schema) {
  if (!! this.__schema)
    throw new Error(`${this.viewName}.schema can be called only once`)
  this.__schema = new SimpleSchema(schema);
  this.onCreated(() => {
    const instance = Template.instance();
    const schema = instance.view.template.__schema;
    const context = schema.newContext();
    instance.autorun(() => {
      context.resetValidation();
      if (! context.validate(Template.currentData()))
        throwValidationError(context, Template.instance());
    });
  });
};

function throwValidationError (context, instance) {
  const invalidKeys = context.invalidKeys();
  console.group(`Invalid arguments passed to ${instance.view.template.viewName}`);
    for (let i = 0; i < invalidKeys.length; i++) {
      const { name, type } = invalidKeys[i];
      console.warn(`${name}: ${type}`);
    }
    logStackTrace(instance.view);
  console.groupEnd();
}

function logStackTrace (view, stack = []) {
  if (view && view.parentView) {
    const match = view.name.match(/^Template\.(.*)$/);
    logStackTrace(view.parentView, match ? [match[1], ...stack] : stack);
  } else {
    console.log(stack.join(' > '));
  }
}
