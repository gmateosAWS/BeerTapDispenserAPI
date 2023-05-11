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
               Input (body):
                {
                    "flow_volume": -58210373.083513424,
                }
               Response 200:
                {
                    "id": "94d5e49e-bb86-3a7c-1561-1e03d82951f3"
                    "flow_volume": -58210373.083513424,
                }
                Response 500: internal server error
            */
            .route('/dispenser')
            .post(dispensers_middleware_1.default.validateRequiredBodyFields, dispensers_controller_1.default.createDispenser);
        // This middleware extracts the param 'id' from path and add it to the body so everything is in there
        this.app.param(`id`, dispensers_middleware_1.default.extractDispenserId);
        this.app
            /* This endpoint will change the status for a given dispenser
                Input (body):
                {
                    "status": "open",
                    "updated_at": "2022-01-01T02:00:00Z"
                }
                Output: 202, 409 (already opened/closed), 500
            */
            .put('/dispenser/:id/status', [
            dispensers_middleware_1.default.validateDispenserExists,
            dispensers_middleware_1.default.validateRequiredBodyFields,
            dispensers_controller_1.default.changeStatus
        ]);
        this.app
            /*
                Returns the money spent by the given dispenser.
                Whether the dispenser is open or close, this endpoint returns how much
                money has this dispenser spent break down by its uses.
                This endpoint could be request at any time, even if the tap is open
                (so, the closed_at field would be null).

                We will use a reference value of 12.25€/l.

                Responses: 200 (spent + usages), 404 (dispenser does not exist), 500
            */
            .get('/dispenser/:id/spending', [
            dispensers_middleware_1.default.validateDispenserExists,
            dispensers_controller_1.default.getAmountAndUsages
        ]);
        return this.app;
    }
}
exports.ApiRoutes = ApiRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwaS9yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJEQUFxRDtBQUNyRCxnR0FBdUU7QUFDdkUsK0ZBQXNFO0FBR3RFLE1BQWEsU0FBVSxTQUFRLDRCQUFZO0lBQ3ZDLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNYLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsR0FBRztZQUNKOzs7Ozs7Ozs7Ozs7Y0FZRTthQUNELEtBQUssQ0FBQyxZQUFZLENBQUM7YUFDbkIsSUFBSSxDQUNELCtCQUFvQixDQUFDLDBCQUEwQixFQUMvQywrQkFBb0IsQ0FBQyxlQUFlLENBQ3ZDLENBQUM7UUFFTixxR0FBcUc7UUFDckcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLCtCQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLEdBQUc7WUFDSjs7Ozs7OztjQU9FO2FBQ0QsR0FBRyxDQUFDLHVCQUF1QixFQUFFO1lBQzFCLCtCQUFvQixDQUFDLHVCQUF1QjtZQUM1QywrQkFBb0IsQ0FBQywwQkFBMEI7WUFDL0MsK0JBQW9CLENBQUMsWUFBWTtTQUNwQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsR0FBRztZQUNKOzs7Ozs7Ozs7O2NBVUU7YUFDRCxHQUFHLENBQUMseUJBQXlCLEVBQUU7WUFDNUIsK0JBQW9CLENBQUMsdUJBQXVCO1lBQzVDLCtCQUFvQixDQUFDLGtCQUFrQjtTQUMxQyxDQUFDLENBQUM7UUFFUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBaEVELDhCQWdFQyJ9