'use strict';
/**
 * Builds Parameters object for dynamic remote method
 */
module.exports = class AcceptBuilder {
    /**
     * Setters
     */
    constructor(ctx) { this.ctx = ctx; }
    /**
     * Parse params according ctx type
     */
    build() {
        let accepts = [];
        if (this.ctx.type === "relation" || this.ctx.type === "nested")
            accepts.push({ arg: 'id', type: 'string', required: true, description: this.ctx.Model.definition.name + ' ID' });
        if (this.ctx.type === "relation" && !this.ctx.relation)
            accepts.push({ arg: 'relation', type: 'string', required: true, description: 'Relationship name' });
        if (this.ctx.type === "nested")
            accepts.push({ arg: 'nested', type: 'string', required: true, description: 'Nested array property name' });
        accepts.push({ arg: 'range', type: 'string', required: true, description: 'Scale range (daily, weekly, monthly, annual)' });
        accepts.push({ arg: 'where', type: 'object', description: 'Statement to filter ' + (this.ctx.relation || this.ctx.nested) });
        return accepts;
    }
}