const db = openDatabase("memorandum", '1.0', 'save memorandum', 2 * 1024 * 1024);
db.transaction(tx => {
	tx.executeSql("CREATE TABLE IF NOT EXISTS tables (tableName)");
});
export default db;