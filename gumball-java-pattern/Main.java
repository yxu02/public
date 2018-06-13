

public class Main {

	public static void main(String[] args) {

        //**********************************************
        //create one-quarter gumball machine
		GumballMachine gumballMachine = GumballMachineFactory.getGumballMachine(5, 25, Coin.QUARTER);

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        //**********************************************
        //create two-quarter gumball machine
        GumballMachine twoQuarterGumballMachine = GumballMachineFactory.getGumballMachine(5, 50, Coin.QUARTER);

        System.out.println(twoQuarterGumballMachine);

        twoQuarterGumballMachine.insertQuarter();
        //on coinType is not enough to play
        twoQuarterGumballMachine.turnCrank();

        twoQuarterGumballMachine.insertQuarter();
        //now there are two quarters. Play can start.
        twoQuarterGumballMachine.turnCrank();

        System.out.println(twoQuarterGumballMachine);

        twoQuarterGumballMachine.insertQuarter();
        twoQuarterGumballMachine.insertQuarter();
        twoQuarterGumballMachine.turnCrank();
        System.out.println(twoQuarterGumballMachine);

        twoQuarterGumballMachine.insertQuarter();
        twoQuarterGumballMachine.insertQuarter();
        twoQuarterGumballMachine.turnCrank();

        System.out.println(twoQuarterGumballMachine);

        //**********************************************
        //create any coin gumball machine
        AnyCoinGumballMachine anyCoinGumballMachine = (AnyCoinGumballMachine) GumballMachineFactory.getGumballMachine(
                2, 50, Coin.ANY);

        anyCoinGumballMachine.insertCoin(Coin.DIME);
        //test eject the last coin
        anyCoinGumballMachine.ejectCoin();

        anyCoinGumballMachine.insertCoin(Coin.DIME);
        anyCoinGumballMachine.insertCoin(Coin.DIME);
        anyCoinGumballMachine.insertCoin(Coin.DIME);
        //test turn crank without enough fund
        anyCoinGumballMachine.turnCrank();

        anyCoinGumballMachine.insertCoin(Coin.DIME);
        anyCoinGumballMachine.insertCoin(Coin.DIME);
        //successfully get a gumball
        anyCoinGumballMachine.turnCrank();

        System.out.println(anyCoinGumballMachine);
        //insert different kind of coins
        anyCoinGumballMachine.insertCoin(Coin.PENNY);
        anyCoinGumballMachine.insertCoin(Coin.NICKEL);
        anyCoinGumballMachine.insertCoin(Coin.DIME);
        anyCoinGumballMachine.insertCoin(Coin.QUARTER);
        anyCoinGumballMachine.insertCoin(Coin.DIME);
        //total fund 51 cents, should be succeed to get a gumball
        anyCoinGumballMachine.turnCrank();
        //sold out
        System.out.println(anyCoinGumballMachine);
    }
}
