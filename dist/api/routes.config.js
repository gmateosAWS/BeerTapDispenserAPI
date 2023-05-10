"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoutes = void 0;
const routes_config_1 = require("../common/routes.config");
class ApiRoutes extends routes_config_1.RoutesConfig {
    constructor(app) {
        super(app, 'ApiRoutes');
    }
    configureRoutes() {
        // API routes handler code for the different exposed endpoints 
        this.app.route('/dispenser')
            // This endpoint will create a new dispenser with a configuration 
            // about how much volume comes out (litres per second)
            .post((req, res) => {
            res.status(200).send('Dispenser created correctly');
            /*
            {
                "id": "94d5e49e-bb86-3a7c-1561-1e03d82951f3"
                "flow_volume": -58210373.083513424,
            }
            O puede devolver error 500 (internal server error)
            */
        });
        this.app.route('/dispenser/:id/status')
            // This endpoint will change the status for a given dispenser
            .put((req, res) => {
            res.status(202).send(`PUT status requested for id ${req.params.id}`);
            /*
            Parámetros de entrada:
            {
            "status": "open",
            "updated_at": "2022-01-01T02:00:00Z"
            }
            Puede devolver: 202, 409 (already opened/closed), 500
            */
        });
        this.app.route('/dispenser/:id/spending')
            /*
                Returns the money spent by the given dispenser
                Whether the dispenser is open or close, this endpoint returns how much
                money has this dispenser Id spent break down by its uses.
                This endpoint could be request at any time, even if the tap is open
                (so, the closed_at field would be null).

                To do so, we will use a reference value of 12.25€/l.

                So, if the dispenser has configured the flow volume ratio as
                0.064 litres/second and the tap was open for 22 seconds,
                the total spent for this usage is 17.248.
            */
            .get((req, res) => {
            res.status(202).send(`GET spending requested for id ${req.params.id}`);
            /*
            Parámetros de vuelta: ver API docs
            Puede devolver: 200, 404 (dispenser does not exist), 500
            */
        });
        return this.app;
    }
}
exports.ApiRoutes = ApiRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwaS9yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUFxRDtBQUdyRCxNQUFhLFNBQVUsU0FBUSw0QkFBWTtJQUN2QyxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDWCwrREFBK0Q7UUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3hCLGtFQUFrRTtZQUNsRSxzREFBc0Q7YUFDckQsSUFBSSxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7WUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNwRDs7Ozs7O2NBTUU7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDO1lBQ25DLDZEQUE2RDthQUM1RCxHQUFHLENBQUMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtZQUNqRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQywrQkFBK0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFOzs7Ozs7O2NBT0U7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDO1lBQ3JDOzs7Ozs7Ozs7Ozs7Y0FZRTthQUNELEdBQUcsQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdkU7OztjQUdFO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBeERELDhCQXdEQyJ9