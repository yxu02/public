

public class NoQuarterState implements State {
    GumballMachine gumballMachine;
 
    public NoQuarterState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }
 
	public void insertQuarter(String quarter) {
		System.out.printf("You inserted a %s\n", quarter);
		gumballMachine.setState(gumballMachine.getHasQuarterState());
	}
 
	public void ejectQuarter(String quarter) {
		System.out.printf("You haven't inserted a %s\n", quarter);
	}
 
	public void turnCrank(String quarter) {
		System.out.printf("You turned, but there's no %s\n", quarter);
	 }
 
	public void dispense() {
		System.out.println("You need to pay first");
	} 
 
	public String toString() {
		return "waiting for coinType";
	}
}
