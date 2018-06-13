

import java.util.Random;

public class HasQuarterState implements State {
	GumballMachine gumballMachine;
 
	public HasQuarterState(GumballMachine gumballMachine) {
		this.gumballMachine = gumballMachine;
	}
  
	public void insertQuarter(String quarter) {
		System.out.printf("You can't insert another %s", quarter);
	}

	public void ejectQuarter(String quarter) {
		System.out.printf("%s returned", quarter);
		gumballMachine.setState(gumballMachine.getNoQuarterState());
	}
 
	public void turnCrank(String quarter) {
		System.out.println("You turned...");
		gumballMachine.setState(gumballMachine.getSoldState());
	}

    public void dispense() {
        System.out.println("No gumball dispensed");
    }
 
	public String toString() {
		return "waiting for turn of crank";
	}
}
