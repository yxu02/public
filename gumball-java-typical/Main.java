/*
*  Author: Yu Xu @ 12Jun2018
*
* */

public class Main {

	public static void main(String[] args) {
		//create and test 1 quarter gumball machine
		GumballMachine gumballMachine = new GumballMachine(5);

		System.out.println("line 9: "+ gumballMachine);

		gumballMachine.insertQuarter( 25 );
		gumballMachine.turnCrank();

		System.out.println("line 14: "+ gumballMachine);

		gumballMachine.insertQuarter( 25 );
		gumballMachine.turnCrank();
		gumballMachine.insertQuarter( 25 );
		gumballMachine.turnCrank();

		System.out.println("line 21: "+gumballMachine);

		//create and test 2-quarter gumball machine
		GumballMachine twoQuarterGumballMachine = new TwoQuarterGumballMachine(5);

		System.out.println("line 26: "+twoQuarterGumballMachine);

		//test non quarter coins
		twoQuarterGumballMachine.insertQuarter( 15 );

		//test 1 quarter to try to start play. Expected: cannot play
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.turnCrank();

		//test 2 quarters to try to start play. 1 quarter is already in from above
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.turnCrank();

		//test over-deposit situation
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.turnCrank();

		//test out of ball
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.turnCrank();

		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.turnCrank();

		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.turnCrank();

		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.insertQuarter( 25 );
		twoQuarterGumballMachine.turnCrank();

		System.out.println("line 62: "+twoQuarterGumballMachine);

		//create and test any-coin gumball machine
		AnyCoinGumballMachine anyCoinGumballMachine = new AnyCoinGumballMachine(5);
		System.out.println("line 66: "+ anyCoinGumballMachine);

		//test depositing valid coins
		anyCoinGumballMachine.insertAnyCoin(-1);
		anyCoinGumballMachine.insertAnyCoin(50);  //rejected because 50 is not a coin

		//deposit any coins
		anyCoinGumballMachine.insertAnyCoin(5);
		anyCoinGumballMachine.insertAnyCoin(10);
		anyCoinGumballMachine.insertAnyCoin(1);
		anyCoinGumballMachine.insertAnyCoin(25);

		//so far it's still not enough to play...
		anyCoinGumballMachine.turnCrank();

		//return all remaining balance
		anyCoinGumballMachine.returnRemainingBalance();

		//test over-deposit situation
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.turnCrank();

		//test out of ball situation
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.turnCrank();

		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.insertAnyCoin(5);
		anyCoinGumballMachine.turnCrank();

		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.turnCrank();

		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.turnCrank();

		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.insertAnyCoin(25);
		anyCoinGumballMachine.turnCrank();

		System.out.println("line 112: "+ anyCoinGumballMachine);

	}
}
