
import { configure } from "./connect";
import 'mocha';
import {expect} from 'chai';
import {assert, stub, match} from 'sinon';

describe('Connect', () => {
    describe('when the application starts', () => {
        let app;

        beforeEach(() => {
            app = {
                get: stub()
            };
        });
        it('should register any controller methods with the express router', () => {
            app.get.callsFake((path, func) => func());
            configure(<any>app);

            assert.calledWith(app.get, '/', match.func);
        })
    });
});