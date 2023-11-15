const FuelController = (ServiceContainer) => {
    // add new stock item
    const addStock = async (req, res) => {
        try {
            const newstockitem = await ServiceContainer.fuelservice.addStockItem(req.body);
            return res.status(201).json({
                success: true,
                message: `Stock successfully Created`,
                data: newstockitem
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    // get Recommended stock items
    const getRocommendedItems = async (req, res) => {
        try {
            const stockRecommendedItems = await ServiceContainer.fuelservice.getRecommendedItems();
            if(stockRecommendedItems.length < 1){
                throw new Error("No stock items")
            }
            return res.status(200).send(stockRecommendedItems)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }
    

    return{
        addStock,
        getRocommendedItems
    }
}

module.exports = FuelController;