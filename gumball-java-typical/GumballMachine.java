
public class GumballMachine
{

    private int num_gumballs;
    boolean has_money;

    public GumballMachine( int size )
    {
        // initialise instance variables
        this.num_gumballs = size;
        this.has_money = false;
    }

    public void insertQuarter(int coin)
    {
        if ( coin == 25 )
            this.has_money = true ;
        else 
            this.has_money = false ;
    }
    
    public void turnCrank()
    {
    	if ( this.has_money)
    	{
    		if ( this.num_gumballs > 0 )
    		{
    			this.num_gumballs-- ;
    			this.has_money = false ;
    			System.out.println( "Thanks for your quarter.  Gumball Ejected!" ) ;
                System.out.println("Remaining balls: " + this.num_gumballs);
    		}
    		else
    		{
    			System.out.println( "No More Gumballs!  Sorry, can't return your money." ) ;
    		}
    	}
    	else 
    	{
    		System.out.println( "Please insert money." ) ;
    	}        
    }
}
