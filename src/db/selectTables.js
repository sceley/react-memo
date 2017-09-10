import db from "./db";
export default resolve => {
	db.transaction(tx => {
		tx.executeSql("select * from tables", [], (tx, result) => {
			resolve(result.rows);
		});
	});
};