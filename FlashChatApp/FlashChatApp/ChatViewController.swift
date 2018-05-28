//
//  ViewController.swift
//  FlashChatApp
//
//  Created by Yu Xu on 05/20/2018.
//

import UIKit
import Firebase
import ChameleonFramework

class ChatViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate {
    
    // Declare instance variables here
    var messageArray: [Message] = [Message]()
    
    // We've pre-linked the IBOutlets
    @IBOutlet var heightConstraint: NSLayoutConstraint!
    @IBOutlet var sendButton: UIButton!
    @IBOutlet var messageTextfield: UITextField!
    @IBOutlet var messageTableView: UITableView!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //TODO: Set yourself as the delegate and datasource here:
        messageTableView.delegate = self
        messageTableView.dataSource = self

        
        //TODO: Set yourself as the delegate of the text field here:
        messageTextfield.delegate = self

        
        //TODO: Set the tapGesture here:
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(tableViewTapped))

        //TODO: Register your MessageCell.xib file here:
        messageTableView.register(UINib(nibName: "MessageCell", bundle: nil), forCellReuseIdentifier: "customMessageCell")
        configureTableView()
        messageTableView.addGestureRecognizer(tapGesture)
        retrieveMessage()
        messageTableView.separatorStyle = .none
    }

    ///////////////////////////////////////////
    
    //MARK: - TableView DataSource Methods
    
    
    
    //TODO: Declare cellForRowAtIndexPath here:
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "customMessageCell", for: indexPath) as! CustomMessageCell
        cell.messageBody.text = messageArray[indexPath.row].messageBody
        cell.senderUsername.text = messageArray[indexPath.row].sender
        cell.avatarImageView.image = UIImage(named: "egg")
        
        if cell.senderUsername.text == Auth.auth().currentUser?.email{
            cell.avatarImageView.backgroundColor = UIColor.flatMint()
            cell.messageBackground.backgroundColor = UIColor.flatSkyBlue()
        } else{
            cell.avatarImageView.backgroundColor = UIColor.flatGray()
            cell.messageBackground.backgroundColor = UIColor.flatOrange()
        }
        return cell
    }
    
    
    //TODO: Declare numberOfRowsInSection here:
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return messageArray.count
    }
    
    
    //TODO: Declare tableViewTapped here:
    @objc func tableViewTapped(){
         messageTextfield.endEditing(true)
    }
    
    
    //TODO: Declare configureTableView here:
    func configureTableView(){
        messageTableView.rowHeight = UITableViewAutomaticDimension
        messageTableView.estimatedRowHeight = 120.0
    }
    
    ///////////////////////////////////////////
    
    //MARK:- TextField Delegate Methods
    
    

    
    //TODO: Declare textFieldDidBeginEditing here:
    func textFieldDidBeginEditing(_ textField: UITextField) {
        UIView.animate(withDuration: 0.5) {
            self.heightConstraint.constant = 308.0
            self.view.layoutIfNeeded()
        }
    }
    
    
    
    //TODO: Declare textFieldDidEndEditing here:
    func textFieldDidEndEditing(_ textField: UITextField) {
        UIView.animate(withDuration: 0.5) {
            self.heightConstraint.constant = 50.0
            self.view.layoutIfNeeded()
        }
    }

    
    ///////////////////////////////////////////
    
    
    //MARK: - Send & Recieve from Firebase
    
    
    
    
    
    @IBAction func sendPressed(_ sender: AnyObject) {
        
        
        //TODO: Send the message to Firebase and save it in our database
        messageTextfield.endEditing(true)
        messageTextfield.isEnabled = false
        sendButton.isEnabled = false
        
        let messageDB = Database.database().reference().child("chat_messages")
        let messageDictionary = ["sender": Auth.auth().currentUser?.email, "messageBody": messageTextfield.text]
        messageDB.childByAutoId().setValue(messageDictionary) {
            (error, reference) in
            if error != nil {
                print(error!)
            } else{
                print("message saved to firebase successfully!")
                self.messageTextfield.isEnabled = true
                self.sendButton.isEnabled = true
                self.messageTextfield.text = ""
            }
        }
    }
    
    //TODO: Create the retrieveMessages method here:
    func retrieveMessage(){
        let messageDB = Database.database().reference().child("chat_messages")
        messageDB.observe(.childAdded) {
            (snapshot) in
            let msg = snapshot.value as! Dictionary<String, String>
            let msgBody = msg["messageBody"]!
            let msgSender = msg["sender"]!
            print("message rendering success!")
            let message = Message()
            message.sender = msgSender
            message.messageBody = msgBody
            
            self.messageArray.append(message)
            self.configureTableView()
            
            self.messageTableView.reloadData()
        }
    }
    

    
    
    
    @IBAction func logOutPressed(_ sender: AnyObject) {
        
        //TODO: Log out the user and send them back to WelcomeViewController
        do{
            try Auth.auth().signOut()
            print("sign out successful!")
        } catch{
            print("sign out error")
        }
        
        guard (navigationController?.popToRootViewController(animated: true)) != nil
            else {
                print("no view controller to pop off")
                return
        }
        
    }
    


}