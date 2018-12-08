liveStockApp.factory('StockMaintainService', [function () {
    let stock = {};

    let instantiateObject = function (record) {
        let instanceRecord = {
            values: [record[1]],
            colorClass: "white",
            time: new Date(),
        }

        instanceRecord.times = [];
        instanceRecord.times.push(instanceRecord.time.getTime());
        return instanceRecord;
    };

    updateStock = function (incomingStock) {
        console.log(incomingStock);
        incomingStock.forEach(function (element) {
            let name = element[0];
            let value = element[1];
            if (stock[name]) {
                let currentStock = stock[name];
                previousValue = currentStock["values"][currentStock["values"].length - 1];
                if (previousValue < value) {
                    currentStock["colorClass"] = "red";
                } else {
                    currentStock["colorClass"] = "green";
                }
                currentStock["values"].push(value);
                currentStock["time"] = new Date;
                currentStock["times"].push(currentStock["time"].getTime());
            } else {
                stock[name] = instantiateObject(element);
            }
        });

        console.log(stock);
    }

    return {
        stock: stock,
        updateStock: updateStock
    };
}]);