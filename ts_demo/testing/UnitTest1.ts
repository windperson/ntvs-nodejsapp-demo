import assert = require('assert');
import HelloMessage = require('../src/Respond/HelloMessage');
describe("Test HelloMessage", () => {
    it("Content Property should be \"Hello World!\"", () => {
        var hello = new HelloMessage.HelloMessage();
        assert.equal(hello.Content, "Hello World!", 'Content Property should be \"Hello World!\".');
    });

    it("ContentType Property is text/plain", () => {
        var hello = new HelloMessage.HelloMessage();
        assert.equal(hello.ContentType, "text/plain", 'ContentType Property should be \"text/plain\".');
    });
});
