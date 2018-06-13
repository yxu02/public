

public class SoldOutState implements State {
    GumballMachine gumballMachine;
 
    public SoldOutState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }
 
	public void insertQuarter(String quarter) {
		System.out.printf("You can't insert a %s, the machine is sold out\n", quarter);
	}
 
	public void ejectQuarter(String quarter) {
		System.out.printf("You can't eject, you haven't inserted a %s yet\n", quarter);
	}
 
	public void turnCrank(String quarter) {
		System.out.println("You turned, but there are no gumballs");
	}
 
	public void dispense() {
		System.out.println("No gumball dispensed");
	}
 
	public String toString() {
		return "sold out";
	}
}
