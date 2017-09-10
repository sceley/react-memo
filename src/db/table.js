import db from "./db";
export let selectTable = (postResolve, tableName) => {
	db.transaction(tx => {
		tx.executeSql(`select * from ${tableName}`, [], (tx, result) => {
			postResolve(result.rows);
		});
	});
};
export let insertTable = (postResolve, tableName, data) => {
	let place = data.place;
	let date = data.date;
	let time = data.time;
	let memo = data.memo;
	db.transaction(tx => {
		tx.executeSql(`insert into ${tableName} (date, time, place, memo) values (?, ?, ?, ?)`, [date, time, place, memo], () => {
			postResolve();
		});
	});
};
export let removeAMemo = (postResolve, tableName, data) => {
	let place = data.place;
	let date = data.date;
	let time = data.time;
	let memo = data.memo;
	db.transaction(tx => {
		tx.executeSql(`delete from ${tableName} where date=? and time=? and place=? and memo=?`, [date, time, place, memo], () => {
			postResolve();
		});
	});
};