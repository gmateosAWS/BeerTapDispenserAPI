"use strict";
class BeerTap {
    constructor() {
        this.dispensers = [];
    }
    createDispenser(flowVolume, pricePerLiter) {
        const id = this.dispensers.length + 1;
        const dispenser = {
            id,
            flowVolume,
            isOpen: false,
            openTime: new Date(),
            closeTime: new Date(),
            revenue: 0,
            pricePerLiter,
        };
        this.dispensers.push(dispenser);
    }
    openTap(dispenserId) {
        const dispenser = this.dispensers.find((d) => d.id === dispenserId);
        if (dispenser) {
            dispenser.isOpen = true;
            dispenser.openTime = new Date();
        }
    }
    closeTap(dispenserId) {
        const dispenser = this.dispensers.find((d) => d.id === dispenserId);
        if (dispenser) {
            dispenser.isOpen = false;
            dispenser.closeTime = new Date();
            const timeDiff = dispenser.closeTime.getTime() - dispenser.openTime.getTime();
            const liters = (timeDiff / 1000) * dispenser.flowVolume;
            dispenser.revenue += liters * dispenser.pricePerLiter;
        }
    }
    calculateRevenue(dispenserId) {
        const dispenser = this.dispensers.find((d) => d.id === dispenserId);
        if (dispenser) {
            return dispenser.revenue;
        }
        return 0;
    }
}
// Example usage
const beerTap = new BeerTap();
// Create a dispenser with flow volume of 1 liter per second and price of 12.25 euros per liter
beerTap.createDispenser(1, 12.25);
// Open tap of dispenser 1
beerTap.openTap(1);
// Wait for 5 seconds
setTimeout(() => {
    // Close tap of dispenser 1
    beerTap.closeTap(1);
    // Calculate revenue for dispenser 1
    const revenue = beerTap.calculateRevenue(1);
    console.log("Revenue for dispenser 1:", revenue, "euros");
}, 5000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGVuc2VyQVBJLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vZGlzcGVuc2VyQVBJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFrQkEsTUFBTSxPQUFPO0lBQWI7UUFDSSxlQUFVLEdBQWdCLEVBQUUsQ0FBQztJQTJDakMsQ0FBQztJQXpDRyxlQUFlLENBQUMsVUFBa0IsRUFBRSxhQUFxQjtRQUNyRCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEMsTUFBTSxTQUFTLEdBQWM7WUFDN0IsRUFBRTtZQUNGLFVBQVU7WUFDVixNQUFNLEVBQUUsS0FBSztZQUNiLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRTtZQUNwQixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDckIsT0FBTyxFQUFFLENBQUM7WUFDVixhQUFhO1NBQ1osQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxPQUFPLENBQUMsV0FBbUI7UUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLENBQUM7UUFDcEUsSUFBSSxTQUFTLEVBQUU7WUFDZixTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN4QixTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLFdBQW1CO1FBQ3hCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLElBQUksU0FBUyxFQUFFO1lBQ2YsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDekIsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBRWpDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM5RSxNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQ3hELFNBQVMsQ0FBQyxPQUFPLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7U0FDckQ7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsV0FBbUI7UUFDaEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLENBQUM7UUFDcEUsSUFBSSxTQUFTLEVBQUU7WUFDZixPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUM7U0FDeEI7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FDSjtBQUVELGdCQUFnQjtBQUNoQixNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBRTlCLCtGQUErRjtBQUMvRixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUVsQywwQkFBMEI7QUFDMUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVuQixxQkFBcUI7QUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtJQUNoQiwyQkFBMkI7SUFDM0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwQixvQ0FBb0M7SUFDcEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyJ9