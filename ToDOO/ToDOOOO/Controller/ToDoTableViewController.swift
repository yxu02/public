//
//  ViewController.swift
//  ToDOOOO
//
//  Created by yu xu on 5/24/18.
//  Copyright © 2018 yu xu. All rights reserved.
//

import UIKit
import RealmSwift
import ChameleonFramework

class ToDoTableViewController: SwipeCellViewController {
    let realm = try! Realm()
    var items: Results<Item>?
    
    @IBOutlet weak var searchBar: UISearchBar!
    var selectedCategory: Category? {
        didSet{
            loadData()
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        loadData()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        if let category = selectedCategory {
            let barColor = UIColor(hexString:category.bkgdColor)!
            navigationController?.navigationBar.barTintColor = barColor
            title = category.name
            searchBar.barTintColor = barColor
            let titleColor = ContrastColorOf(barColor, returnFlat: true)
            navigationController?.navigationBar.tintColor = titleColor
            navigationController?.navigationBar.largeTitleTextAttributes = [NSAttributedStringKey.foregroundColor : titleColor]
        }
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = super.tableView(tableView, cellForRowAt: indexPath)
        if let item = items?[indexPath.row], let category = selectedCategory{
            cell.textLabel?.text = item.title
            if let color = UIColor(hexString: category.bkgdColor)!.darken(byPercentage: CGFloat(indexPath.row)/CGFloat(items!.count)){
                cell.backgroundColor = color
                cell.textLabel?.textColor = ContrastColorOf(color, returnFlat: true)
            }
            cell.accessoryType = item.done ? .checkmark : .none
        } else{
            print("Error: No item can be found")
        }
        return cell
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items?.count ?? 1
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if let item = items?[indexPath.row]{
            do{
                try realm.write {
                    item.done = !item.done
                }
            } catch{
                print("Error at updating item status: \(error)")
            }
        }
        tableView.reloadData()
    }
    
    
    @IBAction func addButtonPressed(_ sender: UIBarButtonItem) {
        var alertTextField = UITextField()
        let alert = UIAlertController(title: "Add New ToDOOOO", message: nil, preferredStyle: .alert)
        let alertAddAction = UIAlertAction(title: "Add", style: .default) {
            (action) in

            if let selected = self.selectedCategory{
                do{
                    try self.realm.write {
                        let newItem = Item()
                        newItem.title = alertTextField.text!
                        newItem.timestamp = Date()
                        newItem.bkgdColor = UIColor.randomFlat.hexValue()
                        selected.items.append(newItem)
                    }
                } catch{
                    print("Error at creating new todo item: \(error)")
                }
            }
            print("new item added!")
            self.tableView.reloadData()

        }
        let alertCancelAction = UIAlertAction(title: "Cancel", style: .default) { (action) in
        }
        alert.addAction(alertAddAction)
        alert.addAction(alertCancelAction)
        alert.addTextField {
            (tf_content) in
            tf_content.placeholder = "Create new item"
            alertTextField = tf_content
            print("new item wrote in!")
        }

        present(alert, animated: true, completion: nil)
    }

    func loadData(){

        items = selectedCategory?.items.sorted(byKeyPath: "timestamp", ascending: true)
        tableView.reloadData()
    }
    
    override func updateModel(at indexPath: IndexPath) {
        do{
            try self.realm.write {
                if let item = self.items?[indexPath.row]{
                    self.realm.delete(item)
                }
            }
        } catch {
            print("Error at deleting: \(error)")
        }
    }
    
}

extension ToDoTableViewController: UISearchBarDelegate{
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        changeQueryResult(searchBar.text!)
    }

    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        changeQueryResult(searchBar.text!)
        
        if searchText.count == 0 {
            loadData()
            DispatchQueue.main.async {
                searchBar.resignFirstResponder()
            }
        }
    }
    func changeQueryResult(_ searchText: String){
        items = items?.filter("title CONTAINS[cd] %@", searchText).sorted(byKeyPath: "timestamp", ascending: false)
        tableView.reloadData()
    }
}







