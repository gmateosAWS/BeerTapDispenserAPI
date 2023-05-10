"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoutes = void 0;
const routes_config_1 = require("../common/routes.config");
const dispensers_controller_1 = __importDefault(require("./controllers/dispensers.controller"));
const dispensers_middleware_1 = __importDefault(require("./middleware/dispensers.middleware"));
class ApiRoutes extends routes_config_1.RoutesConfig {
    constructor(app) {
        super(app, 'ApiRoutes');
    }
    configureRoutes() {
        // API routes handler code for the different exposed endpoints 
        this.app
            /* This endpoint will create a new dispenser with a configuration
               about how much volume comes out (litres per second)
               Respuesta 200:
                {
                    "id": "94d5e49e-bb86-3a7c-1561-1e03d82951f3"
                    "flow_volume": -58210373.083513424,
                }
                O puede devolver error 500 (internal server error)
            */
            .route('/dispenser')
            .post(dispensers_middleware_1.default.validateRequiredBodyFields, dispensers_controller_1.default.createDispenser);
        // This middleware extracts the param 'id' from path and add it to the body so everything is in there
        this.app.param(`id`, dispensers_middleware_1.default.extractDispenserId);
        this.app
            /* This endpoint will change the status for a given dispenser
            Parámetros de entrada:
            {
            "status": "open",
            "updated_at": "2022-01-01T02:00:00Z"
            }
            Puede devolver: 202, 409 (already opened/closed), 500
            */
            .put('/dispenser/:id/status', [
            dispensers_middleware_1.default.validateDispenserExists,
            dispensers_controller_1.default.changeStatus
        ]);
        this.app
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
                Parámetros de vuelta: ver API docs
                Puede devolver: 200, 404 (dispenser does not exist), 500
            */
            .get('/dispenser/:id/spending', [
            dispensers_middleware_1.default.validateDispenserExists,
            dispensers_controller_1.default.getRevenue
        ]);
        return this.app;
    }
}
exports.ApiRoutes = ApiRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwaS9yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJEQUFxRDtBQUNyRCxnR0FBdUU7QUFDdkUsK0ZBQXNFO0FBR3RFLE1BQWEsU0FBVSxTQUFRLDRCQUFZO0lBQ3ZDLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNYLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsR0FBRztZQUNKOzs7Ozs7OztjQVFFO2FBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQzthQUNuQixJQUFJLENBQ0QsK0JBQW9CLENBQUMsMEJBQTBCLEVBQy9DLCtCQUFvQixDQUFDLGVBQWUsQ0FDdkMsQ0FBQztRQUVOLHFHQUFxRztRQUNyRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsK0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsR0FBRztZQUNKOzs7Ozs7O2NBT0U7YUFDRCxHQUFHLENBQUMsdUJBQXVCLEVBQUU7WUFDMUIsK0JBQW9CLENBQUMsdUJBQXVCO1lBQzVDLCtCQUFvQixDQUFDLFlBQVk7U0FDcEMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLEdBQUc7WUFDSjs7Ozs7Ozs7Ozs7Ozs7Y0FjRTthQUNELEdBQUcsQ0FBQyx5QkFBeUIsRUFBRTtZQUM1QiwrQkFBb0IsQ0FBQyx1QkFBdUI7WUFDNUMsK0JBQW9CLENBQUMsVUFBVTtTQUNsQyxDQUFDLENBQUM7UUFFUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBL0RELDhCQStEQyJ9