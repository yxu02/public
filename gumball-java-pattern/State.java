

public interface State {
 
	public void insertQuarter(String quarter);
	public void ejectQuarter(String quarter);
	public void turnCrank(String quarter);
	public void dispense();
}
