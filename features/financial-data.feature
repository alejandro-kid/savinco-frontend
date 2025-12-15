Feature: Gestionar datos financieros por país
  As a financial analyst
  I want to gestionar los datos financieros de los países
  So that I can visualizar y analizar la información consolidada en USD

  Background:
    Given I am on the "Financial Data" dashboard

  Scenario: Ver la lista de datos financieros existentes
    When I open the financial data list
    Then I should see a table with the financial data per country
    And I should see an action to create a new financial data entry
    And I should see an action to view the consolidated summary

  Scenario: Ver mensaje cuando no hay datos financieros
    Given there is no financial data yet
    When I open the financial data list
    Then I should see a message indicating that there is no financial data available
    And I should see an action to create a new financial data entry

  Scenario: Navegar a la pantalla de creación de datos financieros
    Given I am on the "Financial Data" dashboard
    When I click on the "Create Financial Data" action
    Then I should see the financial data creation form
    And I should see the fields for country, currency, capital saved, capital loaned and profits generated

  Scenario: Mostrar estado de carga mientras se obtiene la lista
    Given the financial data list is loading
    When I open the financial data list
    Then I should see a loading indicator
    And the create and summary actions should be disabled

  Scenario: Mostrar error si falla la carga de la lista
    Given the backend returns an error when fetching the financial data list
    When I open the financial data list
    Then I should see an error message indicating that the data could not be loaded
    And I should see a retry action


