import * as squel from "squel";
import * as _ from 'lodash';

export class SquelSelect {

    private query: any;

    private conn: any; // db connection
    private tableName: string;

    constructor(conn: any, tableName: string) {
        this.conn = conn;
        this.tableName = tableName;

        this.query = squel.select()
            .from(this.tableName);
    }

    Field(fields : string[]) {
        fields.forEach(fieldName => {
            this.query = this.query.field(fieldName);
        });
        return this.Clone();
    }

    Equal(params: any) {
        for(var key in params) {
            this.query = this.query.where(`${key} = ?`, params[key]);
        }

        return this.Clone();
    }

    EqualNot(params: any) {
        for(var key in params) {
            this.query = this.query.where(`${key} != ?`, params[key]);
        }

        return this.Clone();
    }

    In(params: any) {
        for(var key in params) {
            this.query = this.query.where(`${key} IN ?`, params[key]);
        }
        return this.Clone();
    }

    ToString() : string {
        return this.query.toString();
    }

    async ToListAsync() {
        try {
            const sp = this.query.toParam();
            //console.log(sp.text, sp.values);

            return await this.conn.query(sp.text, sp.values);
        }
        catch(ex) {
            throw ex;
        }
    }

    Clone() : SquelSelect {
        let copy = new SquelSelect(this.conn, this.tableName);
        copy.query = _.cloneDeep(this.query);
        return copy;
    }
}