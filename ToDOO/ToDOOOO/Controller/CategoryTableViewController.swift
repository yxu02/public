//
//  CategoryTableViewController.swift
//  ToDOOOO
//
//  Created by yu xu on 5/25/18.
//  Copyright © 2018 yu xu. All rights reserved.
//

import UIKit
import RealmSwift
import ChameleonFramework

class CategoryTableViewController: SwipeCellViewController {
    
    var categories: Results<Category>?
    let realm = try! Realm()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadData()
    }
    override func viewWillAppear(_ animated: Bool) {
        if let category = categories?[0]{
            let barColor = UIColor(hexString: category.bkgdColor)!
            navigationController?.navigationBar.barTintColor = barColor
            let titleColor = ContrastColorOf(barColor, returnFlat: true)
            navigationController?.navigationBar.tintColor = titleColor
            navigationController?.navigationBar.largeTitleTextAttributes = [NSAttributedStringKey.foregroundColor : titleColor]
        }
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return categories?.count ?? 1
    }
    
    @IBAction func barButtonPressed(_ sender: UIBarButtonItem) {
        var alertTextField = UITextField()
        
        let alert = UIAlertController(title: "Add New Category", message: nil, preferredStyle: .alert)
        let alertAddAction = UIAlertAction(title: "Add", style: .default) {
            (action) in
            do{
                try self.realm.write {
                    let newCategory = Category()
                    newCategory.name = alertTextField.text!
                    newCategory.bkgdColor = UIColor.randomFlat.hexValue()
                    self.realm.add(newCategory)
                }
            } catch{
                print("Erro at saving data: \(error)")
            }

            self.tableView.reloadData()
        }
        let alertCancelAction = UIAlertAction(title: "Cancel", style: .default) { (action) in
        }
        alert.addAction(alertAddAction)
        alert.addAction(alertCancelAction)
        alert.addTextField {
            (content) in
            content.placeholder = "Create new todo category"
            alertTextField = content
        }
        
        present(alert, animated: true, completion: nil)
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = super .tableView(tableView, cellForRowAt: indexPath)
        if let category = categories?[indexPath.row]{
            cell.textLabel?.text = category.name
            cell.backgroundColor = UIColor(hexString: category.bkgdColor)
            cell.textLabel?.textColor = ContrastColorOf(cell.backgroundColor!, returnFlat: true)
        }
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        performSegue(withIdentifier: "goToItems", sender: self)
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destinationVC = segue.destination as! ToDoTableViewController
        
        if let index = tableView.indexPathForSelectedRow{
            destinationVC.selectedCategory = categories?[index.row]
        }
    }
    
    func loadData(){
        categories = realm.objects(Category.self)
        tableView.reloadData()
    }
    
    override func updateModel(at indexPath: IndexPath) {
        do{
            try self.realm.write {
                if let category = self.categories?[indexPath.row]{
                    self.realm.delete(category)
                }
            }
        } catch {
            print("Error at deleting: \(error)")
        }
    }
}


