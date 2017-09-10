import db from "./db";
export default (postResolve, tableName) => {
	let tx;
	new Promise(resolve => {
		db.transaction(_tx => {
			tx = _tx;
			resolve();
		});
	}).then(() => {
		return new Promise(resolve => {
			tx.executeSql('select * from tables where tableName=?', [tableName], (_tx, result) => {
				resolve(result);
			});
		});
	}).then(result => {
		if(!result.rows.length) {
			return new Promise(resolve => {
				tx.executeSql("insert into tables (tableName) values(?)", [tableName], () => {
					postResolve();
					resolve();
				});
			});
		}
	}).then(() => {
		tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (date, time, place, memo)`);
	});
};