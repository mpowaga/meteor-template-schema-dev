Package.describe({
  name: 'mpowaga:template-schema-dev',
  version: '0.0.1',
  summary: 'Internal package used by mpowaga:template-schema',
  git: 'https://github.com/mpowaga/meteor-template-schema.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'check',
    'blaze-html-templates',
    'aldeed:simple-schema@1.5.3'
  ]);
  api.addFiles('template-schema-dev.js', 'client');
  api.export('TemplateSchema', 'client');
});
