import fs from 'node:fs';
import { expect } from 'chai';
import sinon from 'sinon';
import * as utils from './file-api';

describe('createFile', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('calls writeFileSync', () => {
        const writeStub = sinon.stub(fs, 'writeFileSync');
        utils.createFile('./test');
        expect(writeStub.calledOnce).to.be.true;
    });

    it('calls writeFileSync - injected', () => {
        const writeStub = sinon.stub(fs, 'writeFileSync');
        utils.createFile('./test', fs);
        expect(writeStub.calledOnce).to.be.true;
    });

    it('calls writeFileSync - fake', () => {
        const writeFake = sinon.fake.returns(undefined);
        sinon.replace(fs, 'writeFileSync', writeFake);
        utils.createFile('./test', fs);
        expect(writeFake.calledOnce).to.be.true;
    });

    it('calls writeFileSync - mocks', () => {
        const writeStub = sinon.mock(fs);
        writeStub.expects('writeFileSync').once();
        utils.createFile('./test', fs);
        writeStub.verify();
    });

    it('writeFileSync throws', () => {
        const writeStub = sinon.stub(fs, 'writeFileSync');
        writeStub.throws(new Error());
        expect(() => utils.createFile('./test', fs)).to.throw();
    });
});
