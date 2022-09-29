const FlowValidator = require('@onify/flow-validator');
const {promises: fs} = require('fs');
const {expect} = require('chai');

describe('flow', () => {
  let validator;
  before(async () => {
    const source = await fs.readFile('./dynamics-365-business-central-index-customers.bpmn');
    validator = FlowValidator(source);
  });

  it('model has no errors', async () => {
    const {warnings} = await validator.validate();
    const message = warnings.map(({message}) => message).join('\n');
    expect(warnings, message).to.have.length(0);
  });

  it('scripts have no linting errors', async () => {
    const linting = await validator.lint({
      rules: {
        'no-console': 2,
      },
    });
    expect(linting, linting).to.have.length(0);
  });

});
